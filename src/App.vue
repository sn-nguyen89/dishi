<template>
  <div id="app">
    <GmapMap
      :center="{ lat: 49.1917, lng: -122.5207 }"
      :zoom="10"
      map-type-id="roadmap"
      style="width: 100%; height: 500px; margin-top: 60px"
    >
      <div v-if="savedLocations.length > 0">
        <GmapMarker
          :key="index"
          v-for="(l, index) in savedLocations"
          :icon="{ url: require('../private/img/panda_pin.png') }"
          :position="{ lat: l.geoPoint.latitude, lng: l.geoPoint.longitude }"
        />
      </div>
    </GmapMap>
  </div>
</template>

<script>
// import axios from "axios";
import { db } from "./main";

export default {
  name: "App",
  data: () => ({
    savedLocations: [],
    formData: {
      street: "",
      city: "",
      province: "",
      zip: "",
    },
  }),

  async beforeMount() {
    const snap = await db.collection("locations").get();

    snap.docs.forEach((doc) => {
      this.savedLocations.push(doc.data());
    });
  },
};
</script>