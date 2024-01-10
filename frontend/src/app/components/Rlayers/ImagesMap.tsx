import React, { useEffect, useState } from 'react';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import 'ol/ol.css';
import { RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle, RPopup } from 'rlayers';
import mapPin from "../../../assets/mapPin.svg";
import { Feature } from 'ol';
import { trpc2 } from '../../utils/ConnectTotRPC';
import { FeatureParam } from '../../types/ImagesTypes';


export function MapTest() {
  const [mashu, setMashu] = useState(0);
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
  }, [])
  console.log('featuresArr:', featuresArr);

  if (featuresArr)
    return (
      <div className='grid justify-items-center py-6'>
        <RMap width={'700px'} height={'450px'} className=' rounded-xl' initial={{ center: fromLonLat([34.965, 31.738]), zoom: 9 }}>
          <ROSM />
          <RLayerVector zIndex={10}>
            <RStyle.RStyle>
              <RStyle.RIcon scale={0.13} src={mapPin} anchor={[0.5, 0.8]} />
            </RStyle.RStyle>
            {featuresArr?.map((f, i) => (
              <RFeature
                key={i}
                feature={f.feature}
              >
                <RPopup
                  trigger='hover'
                  className='bg-stone-100 rounded-xl grid justify-items-center max-w-48 max-h-48'
                >
                  <div className='grid justify-items-center'>
                    <img
                      className='rounded-xl mt-2 mx-2 max-w-36 max-h-36'
                      src={f.ImgUrl}
                      alt={f.imgAlt}
                    />
                    <p className='max-w-36 max-h-36 text-sm px-2 py-1'>
                      {f.imgLocation}
                    </p>
                  </div>
                </RPopup>
              </RFeature>
            ))}
          </RLayerVector>
        </RMap>
        {/* <button onClick={() => setMashu(mashu + 1)}>
          Rerender yyeeaahh: {mashu}
        </button> */}
      </div>
    )
}
