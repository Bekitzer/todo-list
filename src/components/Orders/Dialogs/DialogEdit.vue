<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="700">
      <v-card elevation="8" shaped>
        <v-row class="pt-5 pr-5 pl-5">
          <v-col cols="12">
            <h3>שינוי הזמנה</h3>
            <h4>פרטי ההזמנה</h4>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-autocomplete
                :items="clients"
                item-text="name"
                :item-value="clientRef"
                v-model="form.orderClientRef"
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
            <date-picker v-model="form.deliveredAt" label="בחר תאריך אספקה"/>
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-autocomplete
                :items="suppliers"
                item-text="name"
                :item-value="supplierRef"
                v-model="form.orderSupplierRef"
                label="ספק"
                clearable
                filled
                dense
                hide-details
            />
          </v-col>
          <v-col cols="12" md="6" sm="6">
            <v-select v-model="form.statusType" :items="statusTypeList" label="סטטוס הזמנה" filled hide-details/>
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
              <v-btn icon color="red" class="black--text" @click="dialogs.delete = true">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn outlined large color="red" @click="dialog = false">
                ביטול
              </v-btn>
              <v-btn :disabled="saving || formInvalid" :loading="saving" @click="save" outlined large color="green">
                שמירה
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <dialog-delete
        v-if="dialogs.delete"
        v-model="dialogs.delete"
        @close="dialogs.delete = false"
        :order='order'
    />
  </v-row>
</template>

<script>
import {deepCopy, docRef} from '@/stores/utils';

export default {
  name: 'DialogEdit',
  props: ['order', 'value'],
  data: () => ({
    dialogs: {
      delete: false,
      deliveredAt: false
    },
    orderFile: '',
    saving: false,
    form: {},
    orderMargin: '',
    orderSupplierId: '',
    deliveryTypeList: ["משלוח > נאנו", "משלוח > גט", "משלוח > תפוז", "עצמי > הרצליה", "עצמי > משרד"],
    statusTypeList: ["בעבודה", "מוכן - משרד", "מוכן - ספק", "במשלוח", "סופק"],
  }),
  computed: {
    date() {
      return this.form.deliveredAt?.toDate?.()
    },
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
    clientRef({id}) {
      return docRef(`clients/${id}`)
    },
    supplierRef({id}) {
      return docRef(`suppliers/${id}`)
    },
    save() {
      if (!this.formInvalid) {
        this.saving = true
        let payload = {
          ...this.form,
          margin: this.orderMargin = (this.form.sellPrice - this.form.buyPrice),
        }
        this.$store.dispatch('Order/upsert', payload).finally(() => {
          this.saving = false
          this.dialog = false
        })
      }
    }
  },
  created() {
    this.form = deepCopy(this.order)
  },
  components: {
    'dialog-delete': require('@/components/Orders/Dialogs/DialogDelete').default,
    'date-picker': require('@/components/DatePicker/DatePicker').default
  }
}
</script>