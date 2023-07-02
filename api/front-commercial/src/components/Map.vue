<template>
    <div class="map-wrap">
      <a href="https://www.maptiler.com" class="watermark">
        <img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo" />
      </a>


      <div class="map" ref="mapContainer"></div>

<button class="zoom-button zoom-out" @click="zoomOut">-</button>
<button class="zoom-button zoom-in" @click="zoomIn">+</button>
    </div>
  </template>
  
  <script lang="ts">
  import { Map, Marker } from 'maplibre-gl';
  import { shallowRef, onMounted, onUnmounted } from 'vue';
  import type { LngLat, LngLatLike, PointLike } from 'maplibre-gl';
  import * as maptilersdk from '@maptiler/sdk';
  
  export default {
    name: 'Map',
    setup() {
      const mapContainer = shallowRef<HTMLElement | null>(null);
      let map: Map | null = null;
      let marker: Marker | undefined;
 
      
      const zoomIn = () => {
  const currentZoom = map?.getZoom();
  if (currentZoom !== undefined && currentZoom < 20) {
    map?.setZoom(currentZoom + 1);
  }
};

const zoomOut = () => {
  const currentZoom = map?.getZoom();
  if (currentZoom !== undefined && currentZoom > 0) {
    map?.setZoom(currentZoom - 1);
  }
};
      const handleMapClick = (event: MouseEvent) => {
        const clientX = event.clientX;
        const clientY = event.clientY;
  
        if (mapContainer.value) {
          const rect = mapContainer.value.getBoundingClientRect();
          const containerX = clientX - rect.left;
          const containerY = clientY - rect.top;
  
          const point: PointLike = [containerX, containerY];
          const lngLat = map?.unproject(point);
          const finalLngLat = lngLat as LngLat;
  
          if (finalLngLat && map) {
            console.log('Clic sur la carte :', [finalLngLat.lng, finalLngLat.lat]);
            window.alert('Emplacement bien choisi : ' + finalLngLat.lng + ', ' + finalLngLat.lat);
  
            if (marker) {
              marker.setLngLat(finalLngLat);
            } else {
              marker = new Marker({ draggable: true }).setLngLat(finalLngLat);
              marker.addTo(map);
          
              
            }
          }
        }
      };
  
      onMounted(() => {
        const apiKey = 'mMVOMPVoiXTPE47JhttN';
        const initialState = { lng: 3.042048, lat: 36.752887, zoom: 10 };
  
        map = new Map({
          container: mapContainer.value!,
          style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
          center: [initialState.lng, initialState.lat],
          zoom: initialState.zoom,
        });
  
        if (mapContainer.value) {
          mapContainer.value.style.position = 'relative';
        }
  
        map.on('load', () => {
          mapContainer.value?.addEventListener('click', handleMapClick);
        });
      });
  
      onUnmounted(() => {
        map?.off('load', handleMapClick);
        if (marker) {
          marker.remove();
        }
        map?.remove();
      });
  
      return {
        mapContainer,   zoomIn,
    zoomOut,
      };
    },
  };
  </script>
  
  <style scoped>
  @import 'maplibre-gl/dist/maplibre-gl.css';
  
  .map-wrap {
    position: relative;
    width: 100%;
    height: 400px;
  }
  
  .map {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  .zoom-button {
  position: absolute;
  top: 10px;
  width: 40px;
  height: 40px;
  font-size: 24px;
  font-weight: bold;
  background-color: #fff;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.zoom-button.zoom-in {
  left: 20px;
}

.zoom-button.zoom-out {
  right: 20px;
}

.zoom-button:hover {
  background-color: #f0f0f0;
}

.zoom-button:active {
  background-color: #e0e0e0;
}
.red-marker {
  width: 12px;
  height: 12px;
  background-color: red;
  border-radius: 50%;
}


  .watermark {
    position: absolute;
    left: 10px;
    bottom: 10px;
    z-index: 999;
  }
  </style>
  