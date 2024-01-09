import React, { useEffect } from 'react';
import { fromLonLat } from 'ol/proj';
import { Geometry, Point } from 'ol/geom';
import 'ol/ol.css';
import { RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle, RPopup } from 'rlayers';
import iconStore from "../../../assets/pin.svg";
import returnImagesByCategory from '../Home/ReturnImagesBycategory';
import { Feature } from 'ol';
import { useState, useCallback } from 'react';
import { ImageInterface } from '../../types/ImagesTypes';


export function MapTest() {
  const data = returnImagesByCategory('All');
  console.log('data:', data);

  const FeatureParmasArr = data?.map((image) => {
    const featureParams = {
      feature: new Feature({
        geometry: new Point(fromLonLat([image.lng, image.lat])),
      }),
      ImgUrl: image.url,
      imgAlt: image.alt,
      imgLocation: image.description,
      // imgCoor: [image.lng, image.lat]
    }
    console.log('feature params:', featureParams);

    return featureParams;
  });

  if (FeatureParmasArr)
    return (
      <div className='grid justify-items-center py-6'>
        <RMap width={'600px'} height={'450px'} className='example-map' initial={{ center: fromLonLat([34.621, 31.668]), zoom: 11 }}>
          <ROSM />
          <RLayerVector zIndex={10}
          >
            <RStyle.RStyle>
              <RStyle.RIcon src={iconStore} anchor={[0.5, 0.8]} />
            </RStyle.RStyle>
            {FeatureParmasArr.map((featureParam, i) => (
              <RFeature
                key={i}
                feature={featureParam.feature}
              >
                <RPopup
                  trigger='hover'
                  className='bg-stone-100 rounded-xl grid justify-items-center max-w-48 max-h-48'>
                  <img
                    className='rounded-3xl p-2 max-w-36 max-h-36'
                    src={featureParam.ImgUrl}
                    alt={featureParam.imgAlt}
                  />
                  <p>{featureParam.imgLocation}</p>
                </RPopup>
              </RFeature>
            ))}
          </RLayerVector>
        </RMap>
      </div>
    )
}