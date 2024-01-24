import React, { useEffect, useState } from 'react';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import 'ol/ol.css';
import { RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle, RPopup } from 'rlayers';
import mapPin from "../../../assets/mapPin.svg";
import { Feature } from 'ol';
import { trpc2 } from '../../trpcConnetion/ConnectTotRPC';
import { FeatureParam } from '../../types/ImagesTypes';
import { boundingExtent, getCenter } from 'ol/extent';


export function MapTest() {
  const [featuresArr, setFeaturesArr] = React.useState<FeatureParam[]>([]);

  useEffect(() => {
    const getAllImages = async () => {
      try {
        const data = await trpc2.getImagesByCategory.query('All');
        if (data) {
          const FeatureParmasArr = data.map((image) => {
            const featureParams = {
              feature: new Feature({
                geometry: new Point(fromLonLat([image.lng, image.lat])),
              }),
              ImgUrl: image.url,
              imgAlt: image.alt,
              imgLocation: image.location,
              imgId: image.id
            }
            return featureParams;
          });
          setFeaturesArr(FeatureParmasArr)
        }
      }
      catch (error) {
        throw new Error(`error: ${error}`);
      }
    };
    getAllImages()
  }, []);

  const extent = boundingExtent([
    fromLonLat([-181, -80]),
    fromLonLat([180, 83]),
  ]);

  if (featuresArr)
    return (
      <div className='grid justify-items-center py-6'>
        <RMap 
          height={'450px'} 
          className='w-8/12 shadow-2xl' 
          extent={extent}
          initial={{ center: fromLonLat([34.965, 31.738]), zoom: 9 }}>
          <ROSM />
          <RLayerVector zIndex={10}>
            <RStyle.RStyle>
              <RStyle.RIcon scale={0.13} src={mapPin} anchor={[0.5, 0.8]} />
            </RStyle.RStyle>
            {featuresArr?.map((featureParam, i) => (
              <RFeature
                key={i}
                feature={featureParam.feature}
              >
                <RPopup
                  trigger='hover'
                  className='bg-stone-100 rounded-xl grid justify-items-center max-w-48 max-h-48'
                >
                  <div className='grid justify-items-center'>
                    <img
                      className='rounded-xl mt-2 mx-2 max-w-36 max-h-36'
                      src={featureParam.ImgUrl}
                      alt={featureParam.imgAlt}
                    />
                    <p className='max-w-36 max-h-36 text-sm px-2 py-1'>
                      {featureParam.imgLocation}
                    </p>
                  </div>
                </RPopup>
              </RFeature>
            ))}
          </RLayerVector>
        </RMap>
      </div>
    )
}
