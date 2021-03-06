
import { createClient } from 'contentful'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

const contentfulClient = createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN
})

const getContents = async function (type, field, key) {
  const response = await contentfulClient.getEntries({
    content_type: type,
    [field]: key,
    limit: 1
  })
  return '<section>' + documentToHtmlString(response.items[0].fields.body) + '</section>'
}

const getEntry = async function (type, field, key) {
  console.log('func called')
  const response = await contentfulClient.getEntries({
    content_type: type,
    [field]: key,
    limit: 1
  })
  return response.items
}

export default ({ app }, inject) => {
  inject('getEntry', getEntry)
  inject('getContents', getContents)
}
