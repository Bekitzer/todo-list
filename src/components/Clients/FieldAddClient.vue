<template>
  <v-form @submit="addClient">
    <v-row
      class="pa-4"
    >                  
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          v-model="clientName" 
          label="שם לקוח/חברה"
          outlined            
          hide-details  
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          v-model="clientPhone" 
          label="טלפון משרד"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          v-model="clientEmail" 
          label="טלפון משרד"
          outlined
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          v-model="clientNumber" 
          label="מספר עוסק"
          outlined            
          hide-details  
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          v-model="clientType" 
          label="סוג חברה"
          outlined            
          hide-details  
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          v-model="clientAddress" 
          label="כתובת חברה"
          outlined            
          hide-details  
        ></v-text-field>
      </v-col>      
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          v-model="clientContactPerson" 
          label="שם איש קשר"
          outlined            
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-text-field
          v-model="clientContactPersonPhone" 
          label="טלפון איש קשר"
          outlined            
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="2"
      >
        <v-btn 
          outlined
          block
          height="56px"
          :disabled="clientFieldInvalid"
          type="submit"
        >
          שמור לקוח
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
  export default {
    name: 'FieldAddClient',
    data: () => ({ 
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      clientNumber: '',
      clientType: '',
      clientAddress: '',      
      clientContactPerson: '',
      clientContactPersonPhone: '',      
    }),
    computed: {
      clientFieldInvalid() {
        return (
          !this.clientName ||
          !this.clientPhone ||
          !this.clientEmail ||
          !this.clientNumber ||
          !this.clientType ||
          !this.clientAddress ||          
          !this.clientContactPerson ||
          !this.clientContactPersonPhone
        )
      }
    },
    methods:{
      addClient() {               
        if(!this.clientFieldInvalid){
          const clientFields = {
            name: this.clientName,
            phone: this.clientPhone,
            email: this.clientEmail,
            number: this.clientNumber,
            type: this.clientType,
            address: this.clientAddress,            
            contactPerson: this.clientContactPerson,
            contactPersonPhone: this.clientContactPersonPhone
          }
         
          this.$store.dispatch('addClient', clientFields)
          this.clientName = ''
          this.clientPhone = ''
          this.clientEmail = ''
          this.clientNumber = ''
          this.clientType = ''
          this.clientAddress = ''          
          this.clientContactPerson = ''
          this.clientContactPersonPhone = '' 
        }        
      }
    }
  }
</script>