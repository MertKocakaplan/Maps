<template>
  <div class="map-container">
    <div ref="map" class="map"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MapComponent',
  data() {
    return {
      map: null,
      mapLoaded: false,
      userLocationMarker: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    async initMap() {
      try {
        // Backend'den harita konfigürasyonunu al
        const mapConfigResponse = await axios.get('http://localhost:3000/initMap');
        const mapConfig = mapConfigResponse.data;
        this.loadGoogleMapsScript(mapConfig);
      } catch (error) {
        console.error('Error loading map:', error);
      }
    },
    loadGoogleMapsScript(mapConfig) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}&callback=initMapCallback`;
      script.async = true;
      script.defer = true;
      window.initMapCallback = () => this.createMap(mapConfig);
      document.head.appendChild(script);
    },
    createMap(mapConfig) {
      this.map = new google.maps.Map(this.$refs.map, mapConfig);
      this.mapLoaded = true;
      this.showUserLocation();
    },
    async showUserLocation() {
      try {
        // Backend'den kullanýcý konumunu al
        const userLocationResponse = await axios.get('http://localhost:3000/userLocation');
        const userLocation = userLocationResponse.data;
        this.setUserLocationMarker(userLocation);
      } catch (error) {
        console.error('Error retrieving user location:', error);
      }
    },
    setUserLocationMarker(location) {
      this.userLocationMarker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Your Location',
      });
      this.map.setCenter(location);
    },
  },
};
</script>
