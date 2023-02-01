import React from 'react'
import { assets } from '../assets'
import ProductDetailed from '../components/UI/ProductDetailed'

const ProductPage = () => {
  const dataToSend={
  pName:'Zerox Brand Shirt',
  pImages:[assets.bg_01,assets.bg_02],
  pDescription:['test'],
  pID:'test',
  pPrice:'200',
  pTags:'test'

}
  return (
    <div>
      <ProductDetailed dtr={dataToSend} />
    </div>
  )
}

export default ProductPage