import Vue from 'vue'
import moment from 'moment'

Vue.filter('dateFmt',(input,dateString="YYYY-MM-DD")=>{
    return moment(input).format(dateString)
})