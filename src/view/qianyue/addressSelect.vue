<template>
	<section id="addressSelect">
		
		<mt-index-list >
			<header class="header" @click="getAddress">
				<span>{{address}}</span>
				<label>(定位)</label>
			</header>
		  <mt-index-section index="A" v-if="addressList[0].CityListA.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListA" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		  
		  <mt-index-section index="B" v-if="addressList[0].CityListB.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListB" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		  
		  <mt-index-section index="C" v-if="addressList[0].CityListC.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListC" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		  
		  <mt-index-section index="D" v-if="addressList[0].CityListD.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListD" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		  
		  <mt-index-section index="E" v-if="addressList[0].CityListE.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListE" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		  <mt-index-section index="F" v-if="addressList[0].CityListF.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListF" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		  <mt-index-section index="G" v-if="addressList[0].CityListG.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListG" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		  <mt-index-section index="H" v-if="addressList[0].CityListH.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListH" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		  <mt-index-section index="I" v-if="addressList[0].CityListI.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListI" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		  <mt-index-section index="J" v-if="addressList[0].CityListJ.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListJ" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		  <mt-index-section index="K" v-if="addressList[0].CityListK.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListK" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		  
		   <mt-index-section index="L" v-if="addressList[0].CityListL.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListL" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		   
		  <mt-index-section index="M" v-if="addressList[0].CityListM.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListM" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		 <mt-index-section index="N" v-if="addressList[0].CityListN.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListN" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		  <mt-index-section index="O" v-if="addressList[0].CityListO.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListO" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		  <mt-index-section index="P" v-if="addressList[0].CityListP.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListP" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		  <mt-index-section index="Q" v-if="addressList[0].CityListQ.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListQ" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		  <mt-index-section index="R" v-if="addressList[0].CityListR.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListR" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		  <mt-index-section index="S" v-if="addressList[0].CityListS.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListS" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		  <mt-index-section index="T" v-if="addressList[0].CityListT.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListT" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		  <mt-index-section index="U" v-if="addressList[0].CityListU.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListU" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		  <mt-index-section index="V" v-if="addressList[0].CityListV.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListV" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		  <mt-index-section index="W" v-if="addressList[0].CityListW.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListW" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		  <mt-index-section index="X" v-if="addressList[0].CityListX.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListX" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		  <mt-index-section index="Y" v-if="addressList[0].CityListY.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListY" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		  <mt-index-section index="Z" v-if="addressList[0].CityListZ.length>0">
		    <mt-cell v-for="(item,key) in addressList[0].CityListZ" :title="item.CityName" @click.native="addText($event)" :data-title = "item.CityName" :key="key"></mt-cell>
		  </mt-index-section>
		 
		</mt-index-list>
	</section>
	
	
</template>

<script>
	import Vue from 'vue';
	import { mapGetters,mapActions } from 'vuex';
	import { Indicator } from 'mint-ui';
	import { IndexList, IndexSection, Toast } from 'mint-ui';
	import {apiurl} from '../../service/api-config.js';
	Vue.component(IndexList.name, IndexList);
	Vue.component(IndexSection.name, IndexSection);
	
	
	export default {
		data() {
			return {
				address:'',
				addressList:{},
			}
		},
		created() {

			this.address=this.onaddress;
			 let vm=this;
			var headers={
	  			UserID:this.userid,
				Token:this.openid
	  		};
				Indicator.open({
				  text: 'Loading...',
				  spinnerType: 'fading-circle'
				});
	  		
	  		$.ajax({
	  			type:"get",
	  			url:apiurl.GetCityList,
	  			async:true,
	  			headers:headers,
	  			success:function(data){
	  				Indicator.close();
	  				if(data.suc){
		  				vm.addressList=data.rows;
		  			}else{
		  				Toast(data.mes);
		  			}
	  			
	  			}
	  		});
			
		},
		computed: {	
			...mapGetters({
		      openid:'openid',selectaddress:'selectaddress',onaddress:'onaddress',userid:'userid',userinfo:'userinfo'
		    })
		},
		methods: {
			...mapActions([
			      'set_selectaddress'
		    ]),
			addText(e) {
				var vm=this;
				vm.set_selectaddress($(e.currentTarget).attr('data-title'));
				this.$router.push({'name':'HospitalList',params: { pid:0 }});
			},
			getAddress() {
				let vm=this;
				vm.set_selectaddress(vm.address);
				vm.$router.push({'name':'HospitalList',params: { pid:0 }});
			}
			
			
		}
	}
	
</script>
