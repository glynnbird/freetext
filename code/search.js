import { okResponse, notOkResponse, notOk } from './lib/constants.js'
import { porterStemmer } from './lib/stemmer.js'
import { process } from './lib/process.js'

export default {
  async fetch (request, env, ctx) {

    // parse the json
    const json = await request.json()

    // if there's a title
    if (json.text) {
      console.log('text', json.text)
      const words = process(json.text).map((w) => { return porterStemmer(w)})
      console.log('words', words)
      if (words.length === 0) {
        return new Response(notOk, notOkResponse)
      }

      const r = await env.FREETEXT_KV.list({ prefix: `search:${words[0]}`})

      const output = r.keys.map((k) => {
        // k.name = 'prog:<id>'
        const id = k.name.match(/:([0-9]+)$/)[1]
  
        return {
          id: id,
          ...k.metadata
        }
      })

      // send response
      return new Response(JSON.stringify({ ok: true, list: output }), okResponse)
    }
    
    // everyone else gets a 400 response
    return new Response(notOk, notOkResponse)
  }
}