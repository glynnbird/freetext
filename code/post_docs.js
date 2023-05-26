import { okResponse, notOkResponse, notOk } from './lib/constants.js'
import { porterStemmer } from './lib/stemmer.js'
import { process } from './lib/process.js'

export default {
  async fetch (request, env, ctx) {

    // parse the json
    const json = await request.json()

    if (!json.id) {
      json.id = new Date().getTime().toString()
    }
    if (!json.metadata) {
      json.metadata = {}
    }
    if (!json.freetext) {
      json.freetext = ''
    }

    // if there's all the parts we need
    if (json.id && json.doc && json.metadata) {
      console.log('freetext', json.freetext)
      const words = process(json.freetext).map((w) => { return porterStemmer(w)})
      console.log(words)

      // write core doc
      const coreDoc = {
        id: json.id,
        doc: json.doc,
        metadata: json.metadata,
        _ts: new Date().toISOString(),
        _freetext: json.freetext,
        _freetextIndex: words,
        _index: json.index
      }
      await env.FREETEXT_KV.put(`doc:${json.id}`, JSON.stringify(coreDoc))

      // write secondary index docs for freetext search
      for(const word of words) {
        await env.FREETEXT_KV.put(`freetext:${word}:${json.id}`, null, { metadata: json.metadata })
      }

      // write secondary index docs for indexed items
      if (json.index) {
        const keys = Object.keys(json.index)
        for(const key of keys) {
          const v = json.index[key]
          await env.FREETEXT_KV.put(`index:${key}:${v}`, null, { metadata: json.metadata })
        }
      }

      // send response
      return new Response(JSON.stringify({ ok: true, id: json.id }), okResponse)
    }
    
    // everyone else gets a 400 response
    return new Response(notOk, notOkResponse)
  }
}
