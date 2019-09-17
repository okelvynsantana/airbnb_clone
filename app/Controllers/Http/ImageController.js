'use strict'
const Helpers = use('Helpers') 

const Image = use('App/Models/Imagem')
const Property = use('App/Models/Property')

class ImageController {
    async store ({params, request}) {
        const property = await Property.findOrFail(params.id)

        const images = request.file('image', {
            types: ['image'],
            size: '2mb'
        })

        await images.moveAll(Helpers.tmpPath('uploads'), file => ({
            name: `${Date.now()}-${file.clientName}`
        }))

        if(!images.moveAll()) {
            return images.errors()
        }

        await Promise.all(
            images
                .movedList()
                .map(image => property.images().create({ path: image.fileName }))
        )

    }

    async show ({ params, request }) {
        return response.download(Helpers.tmpPath(`uploads/${params.path}`))
    }

}

module.exports = ImageController