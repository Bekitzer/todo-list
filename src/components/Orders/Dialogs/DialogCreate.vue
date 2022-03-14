<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="700">
      <v-card elevation="8" shaped>
        <v-row class="pt-5 pr-5 pl-5">
          <v-col cols="12">
            <h3>יצירת הזמנה</h3>
            <h4>פרטי ההזמנה</h4>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-autocomplete
                :items="clients"
                item-text="name"
                return-object
                v-model="orderClient"
                label="לקוח"
                clearable
                filled
                dense
                hide-details
            />
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field v-model="form.orderWorkTitle" label="שם עבודה" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <v-textarea v-model="form.orderWork" label="מפרט" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <date-picker v-model="form.deliveredAt" lable="תאריך אספקה"/>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-autocomplete
                :items="suppliers"
                item-text="name"
                return-object
                v-model="orderSupplier"
                label="ספק"
                clearable
                filled
                dense
                hide-details
            />
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-select v-model="form.deliveryType" :items="deliveryTypeList" label="אופן אספקה" filled hide-details/>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field type="number" v-model.number="form.sellPrice" label="מחיר מכירה" filled dense hide-details/>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-text-field type="number" v-model.number="form.buyPrice" label="מחיר קנייה" filled dense hide-details/>
          </v-col>
          <v-col cols="12">
            <v-card-actions style="padding:0">
              <v-btn outlined large color="black" @click="addDraft">
                צור כטיוטה
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn outlined large color="red" @click="dialog = false">
                ביטול
              </v-btn>
              <v-btn outlined large color="green" @click="save" :disabled="saving || formInvalid" :loading="saving">
                צור
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {getAuth} from 'firebase/auth'
import emailjs from '@emailjs/browser';
import {docRef} from '@/stores/utils';

export default {
  name: 'DialogCreate',
  props: ['client', 'supplier', 'value'],
  data: () => ({
    saving: false,
    orderClient: {},
    orderSupplier: {},
    form: {},
    deliveryTypeList: ["משלוח > נאנו", "משלוח > גט", "משלוח > תפוז", "עצמי > הרצליה", "עצמי > משרד"],
    orderMargin: '',
  }),
  created() {
    const user = getAuth().currentUser;
    if (user !== null) {
      this.name = user.displayName
    }

    if (this.client) {
      this.orderClient = this.client
    }
    if (this.supplier) {
      this.orderSupplier = this.supplier
    }
  },
  computed: {
    clients() {
      return this.$store.state.Client.list
    },
    suppliers() {
      return this.$store.state.Supplier.list
    },
    formInvalid() {
      return !this.form.orderWorkTitle
    },
    dialog: {
      get() {
        return this.value
      },
      set() {
        this.$emit('close', false)
      }
    },
  },
  methods: {
    save() {
      if (!this.formInvalid) {
        this.saving = true
        const payload = {
          ...this.form,
          orderClientRef: docRef(`clients/${this.orderClient.id}`),
          orderSupplierRef: docRef(`suppliers/${this.orderSupplier.id}`),
          margin: this.orderMargin = (this.form.sellPrice - this.form.buyPrice),
          statusType: this.orderStatusType = 'בהמתנה'
        }

        this.$store.dispatch('Order/upsert', payload).finally(() => {
          this.saving = false
          this.dialog = false
        })

        const mailFields = {
          ...this.form,
          statusType: this.orderStatusType = 'בהמתנה',
          deliveredAt: this.$options.filters.formatDate(this.form.deliveredAt),
          orderClientId: this.orderClient.id,
          orderSupplierRef: this.orderSupplier.id
        }
        emailjs.send('just_print_mailerjet', 'in_work_template', mailFields, 'user_gq2TvX9pNJXFE2gjlLtY5')
            .then((result) => {
              console.log('SUCCESS!', result.text)
            }, (error) => {
              console.log('FAILED...', error.text)
            })
      }
    },
    addDraft() {
      this.saving = true
      const payload = {
        ...this.form,
        orderClientRef: docRef(`clients/${this.orderClient.id}`),
        orderSupplierRef: docRef(`suppliers/${this.orderSupplier.id}`),
        margin: this.orderMargin = (this.orderSellPrice - this.orderBuyPrice),
        statusType: this.orderStatusType = 'טיוטה'
      }

      this.$store.dispatch('Order/upsert', payload).finally(() => {
        this.saving = false
        this.dialog = false
      })
    }
  },
  components: {
    'date-picker': require('@/components/DatePicker/DatePicker').default
  }
}
</script>