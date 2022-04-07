import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <Link href={`/products/${product.slug}`}>
      <a className="card">
        <div className="card-img">
          <Image
            src={`http://localhost:1337${product.images[0].formats.medium.url}`}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <h3>{product.name}</h3>
      </a>
    </Link>
  );
};

export default ProductCard;
