<template>
  <div class="container-fluid mt-1 d-flex justify-content-center align-items-center p-3" style="min-height: calc(100vh - 58px);">
    <div class="card p-4 shadow-lg border-0 d-flex flex-column justify-content-between" 
         style="width: 98%; min-height: calc(100vh - 100px); background-color: #e2ead0; backdrop-filter: blur(10px)">
        
        <!-- Header Controls Panel Section -->
        <div class="row align-items-center mb-4 g-3">
          <div class="col-12 col-md-6">
            <h2 class="fw-bold m-0" style="color: #384232;">Find Your Sparkle!</h2>
            <p class="text-secondary m-0 mt-1 small" style="color: #384232 !important; opacity: 0.85;">
              Use our Upcycling directory to help find your next creative project.
            </p>
          </div>
          <div class="col-12 col-md-6 d-flex justify-content-md-end gap-2">
            <button @click="activeTab = 'projects'" class="btn fw-semibold px-4 py-2 border-0 shadow-sm"
                    :style="activeTab === 'projects' ? 'background-color: #384232; color: white;' : 'background-color: white; color: #384232;'">
              🎨 Community Projects
            </button>
            <button @click="activeTab = 'materials'" class="btn fw-semibold px-4 py-2 border-0 shadow-sm"
                    :style="activeTab === 'materials' ? 'background-color: #384232; color: white;' : 'background-color: white; color: #384232;'">
              🧵 Salvaged Materials
            </button>
          </div>
        </div>

        <!-- Community Projects Tab -->
        <div v-if="activeTab === 'projects'" class="bg-white p-3 rounded-3 shadow-sm border border-opacity-10 flex-grow-1">
          
          <!-- DataTable Container  -->
          <DataTable 
            :value="projects" 
            :paginator="true" 
            :rows="10" 
            dataKey="id"
            v-model:filters="projectFilters"
            filterDisplay="row"
            :globalFilterFields="['title', 'creator', 'difficulty']"
            class="p-datatable-sm custom-prime-table"
          >
            <!-- Search Header -->
            <template #header>
              <div class="d-flex justify-content-start align-items-center">
                <span class="p-input-icon-left w-100" style="max-width: 300px;">
                  <input type="text" class="form-control" v-model="projectFilters['global'].value" placeholder="🔍 Global Project Search..." />
                </span>
              </div>
            </template>

            <!-- Search and Sorting  -->
            <Column field="title" header="Project Title" :sortable="true" :filterStructure="{ value: null, matchMode: 'contains' }">
              <template #filter="{ filterModel, filterCallback }">
                <input type="text" v-model="filterModel.value" @input="filterCallback()" class="form-control form-control-sm" placeholder="Search Title" />
              </template>
            </Column>

            <Column field="creator" header="Hobbyist" :sortable="true">
              <template #filter="{ filterModel, filterCallback }">
                <input type="text" v-model="filterModel.value" @input="filterCallback()" class="form-control form-control-sm" placeholder="Search User" />
              </template>
            </Column>

            <Column field="difficulty" header="Difficulty" :sortable="true">
              <template #filter="{ filterModel, filterCallback }">
                <input type="text" v-model="filterModel.value" @input="filterCallback()" class="form-control form-control-sm" placeholder="Search Difficulty" />
              </template>
              <template #body="slotProps">
                <span class="badge" :style="slotProps.data.difficulty === 'Easy' ? 'background-color: #aaa46e;' : 'background-color: #384232;'">
                  {{ slotProps.data.difficulty }}
                </span>
              </template>
            </Column>

            <Column field="materialUsed" header="Primary Resource Material"></Column>
          </DataTable>
        </div>

        <!-- Salvaged Materials Tab -->
        <div v-if="activeTab === 'materials'" class="bg-white p-3 rounded-3 shadow-sm border border-opacity-10 flex-grow-1">
          
          <DataTable 
            :value="materials" 
            :paginator="true" 
            :rows="10" 
            dataKey="id"
            v-model:filters="materialFilters"
            filterDisplay="row"
            :globalFilterFields="['type', 'category', 'bestProject']"
            class="p-datatable-sm custom-prime-table"
          >
            <template #header>
              <div class="d-flex justify-content-start align-items-center">
                <span class="p-input-icon-left w-100" style="max-width: 300px;">
                  <input type="text" class="form-control" v-model="materialFilters['global'].value" placeholder="🔍 Global Material Search..." />
                </span>
              </div>
            </template>

            <Column field="type" header="Material Type" :sortable="true">
              <template #filter="{ filterModel, filterCallback }">
                <input type="text" v-model="filterModel.value" @input="filterCallback()" class="form-control form-control-sm" placeholder="Search Type" />
              </template>
            </Column>

            <Column field="category" header="Category" :sortable="true">
              <template #filter="{ filterModel, filterCallback }">
                <input type="text" v-model="filterModel.value" @input="filterCallback()" class="form-control form-control-sm" placeholder="Search Category" />
              </template>
            </Column>

            <Column field="bestProject" header="Recommended Application" :sortable="true">
              <template #filter="{ filterModel, filterCallback }">
                <input type="text" v-model="filterModel.value" @input="filterCallback()" class="form-control form-control-sm" placeholder="Search Project" />
              </template>
            </Column>
          </DataTable>
        </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from '@primevue/core/api';

const activeTab = ref('projects');

// Initialize PrimeVue reactive filter configuration parameters mapping
const projectFilters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    creator: { value: null, matchMode: FilterMatchMode.CONTAINS },
    difficulty: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const materialFilters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    category: { value: null, matchMode: FilterMatchMode.CONTAINS },
    bestProject: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

// Sample data for demonstration purposes
const projects = ref([
    { id: 1, title: "Patchwork Denim Tote Bag", creator: "SquareUp", difficulty: "Medium", materialUsed: "Old Denim Jeans" },
    { id: 2, title: "Crochet Plastic Bag Yarn", creator: "HollanderKnits", difficulty: "Easy", materialUsed: "Plastic Grocery Bags" },
    { id: 3, title: "Mason Jar Hanging Planter", creator: "Ushiwaka", difficulty: "Easy", materialUsed: "Glass Mason Jars" },
    { id: 4, title: "Pallet Wood Coffee Table", creator: "AshKetchum", difficulty: "Hard", materialUsed: "Shipping Pallets" },
    { id: 5, title: "T-Shirt Shag Rug", creator: "Scoobydoo", difficulty: "Medium", materialUsed: "Cotton T-Shirts" },
    { id: 6, title: "Spoon Handle Drawer Pulls", creator: "Alakazam", difficulty: "Easy", materialUsed: "Silver Cutlery" },
    { id: 7, title: "Wine Cork Bulletin Board", creator: "ChappellRoan", difficulty: "Easy", materialUsed: "Cork Stoppers" },
    { id: 8, title: "Skateboard Floating Shelf", creator: "Tom", difficulty: "Medium", materialUsed: "Broken Skateboard Decks" },
    { id: 9, title: "CD Mosaic Birdbath", creator: "SnowWhite", difficulty: "Hard", materialUsed: "Old CDs & DVDs" },
    { id: 10, title: "Flannel Rag Heat Packs", creator: "Brand", difficulty: "Easy", materialUsed: "Flannel Shirts" },
    { id: 11, title: "Cardboard Geometric Lamp", creator: "Luxana", difficulty: "Hard", materialUsed: "Corrugated Cardboard" },
    { id: 12, title: "Leather Belt Watch Straps", creator: "Rozanov", difficulty: "Medium", materialUsed: "Discarded Leather Belts" },
    { id: 13, title: "Tin Can Lanterns", creator: "Tintin", difficulty: "Easy", materialUsed: "Empty Tin Cans" },
    { id: 14, title: "Bottle Cap Mosaic Tabletop", creator: "CanadaDry", difficulty: "Hard", materialUsed: "Metal Bottle Caps" },
    { id: 15, title: "Plastic Bottle Greenhouse", creator: "EcoGrower", difficulty: "Medium", materialUsed: "Plastic Bottles" }
]);

const materials = ref([
    { id: 1, type: "Denim Offcuts", category: "Textiles", bestProject: "Quilts & Heavy Aprons" },
    { id: 2, type: "Glass Wine Bottles", category: "Glassware", bestProject: "Cut-glass Candle Vessels" },
    { id: 3, type: "Scrap Yarn Skeins", category: "Textiles", bestProject: "Amigurumi Toys & Coasters" },
    { id: 4, type: "Hardcover Book Spines", category: "Paper Goods", bestProject: "Secret Safe Storage Trays" },
    { id: 5, type: "Corrugated Cardboard Sheets", category: "Paper Goods", bestProject: "Architectural Models & Shades" },
    { id: 6, type: "Scrap Upholstery Leather", category: "Textiles", bestProject: "Small Pouches & Cord Wraps" },
    { id: 7, type: "Discarded Wooden Ladders", category: "Furniture", bestProject: "Rustic Plant Stands & Bookcases" },
    { id: 8, type: "Aluminum Soda Can Tabs", category: "Metals", bestProject: "Chainmail Costumes & Jewelry" },
    { id: 9, type: "Bicycle Inner Tubes", category: "Rubber", bestProject: "Heavy-Duty Belts & Wallets" },
    { id: 10, type: "Old Vinyl Records", category: "Plastics", bestProject: "Heat-molded Bowls & Wall Art" },
    { id: 11, type: "Broken Ceramic Plates", category: "Ceramics", bestProject: "Mosaic Stepping Stones" },
    { id: 12, type: "Plastic Bottle Caps", category: "Plastics", bestProject: "Molded Hardware Items" }
]);
</script>

<style scoped>

/* Custom PrimeVue DataTable Styling */
.custom-prime-table :deep(.p-datatable-thead th) {
background-color: #f8f9fa !important;
color: #384232 !important;
font-weight: 700;
}
.custom-prime-table :deep(.p-paginator) {
margin-top: 15px;
background: transparent;
border: none;
}
.custom-prime-table :deep(.p-link) {
color: #384232;
}
.custom-prime-table :deep(.p-highlight) {
background-color: #384232 !important;
color: white !important;
}

</style>
