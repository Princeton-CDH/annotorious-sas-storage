(()=>{"use strict";var t={607:function(t,e,n){var a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const o=a(n(55)),r=a(n(732)),i=new Event("annotations-loaded");e.default=(t,e)=>{const n=new o.default(e.target,e.annotationEndpoint);return n.all().then((e=>{t.setAnnotations(e.items),document.dispatchEvent(i)})),t.on("createAnnotation",(async a=>(a.target.source=(0,r.default)(a.target.source,e),n.create(a).then((()=>{document.dispatchEvent(i)})),console.log(a),t.addAnnotation(a),a))),t.on("updateAnnotation",((a,o)=>{a.id=o.id,a.target.source=(0,r.default)(a.target.source,e),n.update(a),t.addAnnotation(a)})),t.on("deleteAnnotation",(t=>{n.delete(t.id)})),{adapter:n}}},55:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});class n{constructor(t,e){this.canvasId=t,this.endpointUrl=e}get annotationPageId(){return`${this.endpointUrl}/search?uri=${this.canvasId}`}async create(t){return fetch(`${this.endpointUrl}/create`,{body:JSON.stringify(n.createV2Anno(t)),headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST"}).then((()=>this.all())).catch((()=>this.all()))}async update(t){return fetch(`${this.endpointUrl}/update`,{body:JSON.stringify(n.createV2Anno(t)),headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST"}).then((()=>this.all())).catch((()=>this.all()))}async delete(t){return fetch(`${this.endpointUrl}/destroy?uri=${encodeURIComponent(t)}`,{headers:{Accept:"application/json","Content-Type":"application/json"},method:"DELETE"}).then((()=>this.all())).catch((()=>this.all()))}async get(t){const e=await this.all();return e?e.items.find((e=>e.id===t)):null}async all(){const t=await fetch(this.annotationPageId),e=await t.json();return this.createAnnotationPage(e)}static createV2Anno(t){let e=null;e=Array.isArray(t.body)?t.body.map((t=>this.createV2AnnoBody(t))):this.createV2AnnoBody(t.body);const n={"@id":t.id&&t.id.startsWith("http")?t.id:void 0,"@context":"http://iiif.io/api/presentation/2/context.json","@type":"oa:Annotation",motivation:"oa:commenting",on:{"@type":"oa:SpecificResource",full:t.target.source.id},resource:e};if(t.target.selector){if(Array.isArray(t.target.selector)){const e=t.target.selector.map((t=>{if(t){const e=this.createV2AnnoSelector(t);if(e)return e}}));n.on.selector={"@type":"oa:Choice",default:e[0],item:e[1]}}else{const e=this.createV2AnnoSelector(t.target.selector);e&&(n.on.selector=e)}t.target.source.partOf&&(n.on.within={"@id":t.target.source.partOf.id,"@type":"sc:Manifest"})}return n}static createV2AnnoBody(t){const e={"@type":"tagging"===t.purpose?"oa:Tag":"dctypes:Text",chars:t.value};return t.format&&(e.format=t.format),t.language&&(e.language=t.language),e}static createV2AnnoSelector(t){switch(t.type){case"SvgSelector":return{"@type":"oa:SvgSelector",value:t.value};case"FragmentSelector":return{"@type":"oa:FragmentSelector",value:t.value.replace("xywh=pixel:","xywh=")};default:return null}}createAnnotationPage(t){if(Array.isArray(t)){const e=t.map((t=>n.createV3Anno(t)));return{id:this.annotationPageId,items:e,type:"AnnotationPage"}}return t}static createV3Anno(t){let e=null;e=Array.isArray(t.resource)?t.resource.map((t=>this.createV3AnnoBody(t))):this.createV3AnnoBody(t.resource);let n=t.on;Array.isArray(n)&&([n]=n);const a={selector:n.selector?this.createV3AnnoSelector(n.selector):void 0,source:n.full};return n.within&&(a.source={id:n.full,partOf:{id:n.within["@id"],type:"Manifest"},type:"Canvas"}),{"@context":"http://www.w3.org/ns/anno.jsonld",id:t["@id"],motivation:"commenting",type:"Annotation",target:a,body:e}}static createV3AnnoBody(t){const e={type:"TextualBody",value:t.chars};return t.format&&(e.format=t.format),t.language&&(e.language=t.language),"oa:Tag"===t["@type"]&&(e.purpose="tagging"),e}static createV3AnnoSelector(t){switch(t["@type"]){case"oa:SvgSelector":return{type:"SvgSelector",value:t.value};case"oa:FragmentSelector":return{type:"FragmentSelector",conformsTo:"http://www.w3.org/TR/media-frags/",value:t.value?t.value.replace("xywh=","xywh=pixel:"):""};case"oa:Choice":return[t.default?this.createV3AnnoSelector(t.default):null,t.item?this.createV3AnnoSelector(t.item):null];default:return null}}}e.default=n},732:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=(t,e)=>("string"==typeof t&&(t={id:e.target,partOf:{id:e.manifest,type:"Manifest"},type:"Canvas"}),t)}},e={},n=function n(a){var o=e[a];if(void 0!==o)return o.exports;var r=e[a]={exports:{}};return t[a].call(r.exports,r,r.exports,n),r.exports}(607);module.exports=n})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RVpkLE1BQU9hLEVBQVdiLE1BQ1phLEVBQVdiLE1BQU1LLFFBQVEsUUFBUyxlQUNsQyxJQUVkLElBQUssWUFFRCxNQUFPLENBQ0hRLEVBQVdwQixRQUNMckMsS0FBS3dELHFCQUFxQkMsRUFBV3BCLFNBQ3JDLEtBQ05vQixFQUFXM0MsS0FDTGQsS0FBS3dELHFCQUFxQkMsRUFBVzNDLE1BQ3JDLE1BRWQsUUFDSSxPQUFPLE9BaFJ2QixhLDZEQ09BLFVBdEIyQixDQUN2QjNCLEVBQ0FkLEtBSXFCLGlCQUFWYyxJQUVQQSxFQUFTLENBRUxNLEdBQUlwQixFQUFTRSxPQUViK0QsT0FBUSxDQUNKN0MsR0FBSXBCLEVBQVNzRixTQUNiWCxLQUFNLFlBRVZBLEtBQU0sV0FHUDdELEtDckJQeUUsRUFBMkIsR0NFM0JDLEVEQ0osU0FBU0MsRUFBb0JDLEdBRTVCLElBQUlDLEVBQWVKLEVBQXlCRyxHQUM1QyxRQUFxQmxDLElBQWpCbUMsRUFDSCxPQUFPQSxFQUFhQyxRQUdyQixJQUFJQyxFQUFTTixFQUF5QkcsR0FBWSxDQUdqREUsUUFBUyxJQU9WLE9BSEFFLEVBQW9CSixHQUFVSyxLQUFLRixFQUFPRCxRQUFTQyxFQUFRQSxFQUFPRCxRQUFTSCxHQUdwRUksRUFBT0QsUUNsQldILENBQW9CLEsiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hbm5vdG9yaW91cy1zYXMtc3RvcmFnZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9hbm5vdG9yaW91cy1zYXMtc3RvcmFnZS8uL3NyYy91dGlscy9TaW1wbGVBbm5vdGF0aW9uU2VydmVyVjJBZGFwdGVyLnRzIiwid2VicGFjazovL2Fubm90b3Jpb3VzLXNhcy1zdG9yYWdlLy4vc3JjL3V0aWxzL2FkanVzdFRhcmdldFNvdXJjZS50cyIsIndlYnBhY2s6Ly9hbm5vdG9yaW91cy1zYXMtc3RvcmFnZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hbm5vdG9yaW91cy1zYXMtc3RvcmFnZS93ZWJwYWNrL3N0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gYW5ub3RvcmlvdXMgcGx1Z2luIHRvIHVzZSBzaW1wbGUgYW5ub3RhdGlvbiBzZXJ2ZXIgYXMgYSBzdG9yYWdlXG5cbmltcG9ydCBTaW1wbGVBbm5vdGF0aW9uU2VydmVyVjJBZGFwdGVyIGZyb20gXCIuL3V0aWxzL1NpbXBsZUFubm90YXRpb25TZXJ2ZXJWMkFkYXB0ZXJcIjtcbmltcG9ydCBhZGp1c3RUYXJnZXRTb3VyY2UgZnJvbSBcIi4vdXRpbHMvYWRqdXN0VGFyZ2V0U291cmNlXCI7XG5pbXBvcnQgdHlwZSB7IEFubm90YXRpb24sIFNhdmVkQW5ub3RhdGlvbiB9IGZyb20gXCIuL3R5cGVzL1YzL0Fubm90YXRpb25cIjtcbmltcG9ydCB0eXBlIHsgQW5ub3RhdGlvblBhZ2UgfSBmcm9tIFwiLi90eXBlcy9WMy9Bbm5vdGF0aW9uUGFnZVwiO1xuaW1wb3J0IHR5cGUgeyBTZXR0aW5ncyB9IGZyb20gXCIuL3R5cGVzL1NldHRpbmdzXCI7XG5cbi8vIGRlZmluZSBhIGN1c3RvbSBldmVudCB0byBpbmRpY2F0ZSB0aGF0IGFubm90YXRpb25zIGhhdmUgYmVlbiBsb2FkZWRcbmNvbnN0IEFubm9Mb2FkRXZlbnQgPSBuZXcgRXZlbnQoXCJhbm5vdGF0aW9ucy1sb2FkZWRcIik7XG5cbi8vIFRPRE86IEFkZCBhIHR5cGVkZWYgZm9yIHRoZSBBbm5vdG9yaW91cyBjbGllbnQgKGFubm8pXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuY29uc3QgQW5ub3RhdGlvblNlcnZlclN0b3JhZ2UgPSAoYW5ubzogYW55LCBzZXR0aW5nczogU2V0dGluZ3MpID0+IHtcbiAgICBjb25zdCBhZGFwdGVyID0gbmV3IFNpbXBsZUFubm90YXRpb25TZXJ2ZXJWMkFkYXB0ZXIoXG4gICAgICAgIHNldHRpbmdzLnRhcmdldCwgLy8gc2hvdWxkIGJlIGNhbnZhcyBpZFxuICAgICAgICBzZXR0aW5ncy5hbm5vdGF0aW9uRW5kcG9pbnQsXG4gICAgKTtcblxuICAgIC8vIGxvYWQgYW5kIGRpc3BsYXkgYW5ub3RhdGlvbnMgZnJvbSBzZXJ2ZXJcbiAgICBhZGFwdGVyLmFsbCgpLnRoZW4oKGFubm90YXRpb25QYWdlOiBBbm5vdGF0aW9uUGFnZSkgPT4ge1xuICAgICAgICBhbm5vLnNldEFubm90YXRpb25zKGFubm90YXRpb25QYWdlLml0ZW1zKTtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChBbm5vTG9hZEV2ZW50KTtcbiAgICB9KTtcblxuICAgIC8vIGNyZWF0ZSBhIG5ldyBhbm5vdGF0aW9uXG4gICAgYW5uby5vbihcImNyZWF0ZUFubm90YXRpb25cIiwgYXN5bmMgKGFubm90YXRpb246IEFubm90YXRpb24pID0+IHtcbiAgICAgICAgYW5ub3RhdGlvbi50YXJnZXQuc291cmNlID0gYWRqdXN0VGFyZ2V0U291cmNlKFxuICAgICAgICAgICAgYW5ub3RhdGlvbi50YXJnZXQuc291cmNlLFxuICAgICAgICAgICAgc2V0dGluZ3MsXG4gICAgICAgICk7XG4gICAgICAgIGFkYXB0ZXIuY3JlYXRlKGFubm90YXRpb24pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gYnkgZGVmYXVsdCwgc3RvcmFnZSByZWxvYWRzIGFsbCBhbm5vdGF0aW9ucyBmb3IgdGhpcyBwYWdlO1xuICAgICAgICAgICAgLy8gc2lnbmFsIHRoYXQgYW5ub3RhdGlvbnMgaGF2ZSBiZWVuIGxvYWRlZFxuICAgICAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChBbm5vTG9hZEV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGhvdyB0byB1cGRhdGUgaWQgZm9yIGFubm90b3Jpb3VzP1xuICAgICAgICBjb25zb2xlLmxvZyhhbm5vdGF0aW9uKTtcbiAgICAgICAgYW5uby5hZGRBbm5vdGF0aW9uKGFubm90YXRpb24pO1xuICAgICAgICByZXR1cm4gYW5ub3RhdGlvbjtcbiAgICB9KTtcblxuICAgIC8vIHVwZGF0ZSBhbiBhbm5vdGF0aW9uXG4gICAgYW5uby5vbihcbiAgICAgICAgXCJ1cGRhdGVBbm5vdGF0aW9uXCIsXG4gICAgICAgIChhbm5vdGF0aW9uOiBBbm5vdGF0aW9uLCBwcmV2aW91czogQW5ub3RhdGlvbikgPT4ge1xuICAgICAgICAgICAgLy8gVGhlIHBvc3RlZCBhbm5vdGF0aW9uIHNob3VsZCBoYXZlIGFuIEBpZCB3aGljaCBleGlzdHMgaW4gdGhlIHN0b3JlXG4gICAgICAgICAgICAvLyBjb25zdCBuZXdJZCA9IGFubm90YXRpb24uaWQ7IC8vIGRvIHdlIG5lZWQgdG8gZG8gYW55dGhpbmcgd2l0aCB0aGlzP1xuICAgICAgICAgICAgYW5ub3RhdGlvbi5pZCA9IHByZXZpb3VzLmlkO1xuICAgICAgICAgICAgLy8gdGFyZ2V0IG5lZWRzIHRvIGJlIHVwZGF0ZWQgaWYgdGhlIGltYWdlIHNlbGVjdGlvbiBoYXMgY2hhbmdlZFxuICAgICAgICAgICAgYW5ub3RhdGlvbi50YXJnZXQuc291cmNlID0gYWRqdXN0VGFyZ2V0U291cmNlKFxuICAgICAgICAgICAgICAgIGFubm90YXRpb24udGFyZ2V0LnNvdXJjZSxcbiAgICAgICAgICAgICAgICBzZXR0aW5ncyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhZGFwdGVyLnVwZGF0ZShhbm5vdGF0aW9uKTtcbiAgICAgICAgICAgIC8vIGFkZCB0aGUgYW5ub3RhdGlvbiB0byBhbm5vdG9yaW91cyBhZ2FpbiB0byBtYWtlIHN1cmUgdGhlIGRpc3BsYXkgaXMgdXAgdG8gZGF0ZVxuICAgICAgICAgICAgYW5uby5hZGRBbm5vdGF0aW9uKGFubm90YXRpb24pO1xuICAgICAgICB9LFxuICAgICk7XG5cbiAgICAvLyBkZWxldGUgYW4gYW5ub3RhdGlvblxuICAgIGFubm8ub24oXCJkZWxldGVBbm5vdGF0aW9uXCIsIChhbm5vdGF0aW9uOiBTYXZlZEFubm90YXRpb24pID0+IHtcbiAgICAgICAgYWRhcHRlci5kZWxldGUoYW5ub3RhdGlvbi5pZCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBzdG9yYWdlUGx1Z2luID0ge1xuICAgICAgICBhZGFwdGVyOiBhZGFwdGVyLFxuICAgIH07XG5cbiAgICByZXR1cm4gc3RvcmFnZVBsdWdpbjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFubm90YXRpb25TZXJ2ZXJTdG9yYWdlO1xuIiwiLyogQ29udmVydCBiZXR3ZWVuIHYyIChvcGVuIGFubm90YXRpb24pIGFuZCB2MyAodzNjKSBhbm5vdGF0aW9uc1xuICAgaW4gb3JkZXIgdG8gYnJpZGdlIGJldHdlZW4gYW5ub3RvcmlvdXMgKHczYykgYW5kIHNpbXBsZSBhbm5vdGF0aW9uIHNlcnZlciAodjIpLlxuXG4gICBBZGFwdGVkIGZyb20gbWlyYWRvci1hbm5vdGF0aW9ucyBjb2RlXG4gICBodHRwczovL2dpdGh1Yi5jb20vUHJvamVjdE1pcmFkb3IvbWlyYWRvci1hbm5vdGF0aW9ucy9ibG9iL21hc3Rlci9zcmMvU2ltcGxlQW5ub3RhdGlvblNlcnZlclYyQWRhcHRlci5qc1xuXG4qL1xuXG5pbXBvcnQgdHlwZSB7IEFubm90YXRpb24gYXMgVjJBbm5vdGF0aW9uIH0gZnJvbSBcIi4uL3R5cGVzL1YyL0Fubm90YXRpb25cIjtcbmltcG9ydCB0eXBlIHsgQW5ub3RhdGlvbiBhcyBWM0Fubm90YXRpb24gfSBmcm9tIFwiLi4vdHlwZXMvVjMvQW5ub3RhdGlvblwiO1xuaW1wb3J0IHR5cGUgeyBBbm5vdGF0aW9uUGFnZSB9IGZyb20gXCIuLi90eXBlcy9WMy9Bbm5vdGF0aW9uUGFnZVwiO1xuaW1wb3J0IHR5cGUgeyBCb2R5IGFzIFYyQm9keSB9IGZyb20gXCIuLi90eXBlcy9WMi9Cb2R5XCI7XG5pbXBvcnQgdHlwZSB7IEJvZHkgYXMgVjNCb2R5IH0gZnJvbSBcIi4uL3R5cGVzL1YzL0JvZHlcIjtcbmltcG9ydCB0eXBlIHsgU2VsZWN0b3IgYXMgVjJTZWxlY3RvciB9IGZyb20gXCIuLi90eXBlcy9WMi9TZWxlY3RvclwiO1xuaW1wb3J0IHR5cGUgeyBTZWxlY3RvciBhcyBWM1NlbGVjdG9yIH0gZnJvbSBcIi4uL3R5cGVzL1YzL1NlbGVjdG9yXCI7XG5pbXBvcnQgdHlwZSB7IFNvdXJjZSB9IGZyb20gXCIuLi90eXBlcy9WMy9Tb3VyY2VcIjtcbmltcG9ydCB0eXBlIHsgVGFyZ2V0IH0gZnJvbSBcIi4uL3R5cGVzL1YzL1RhcmdldFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW1wbGVBbm5vdGF0aW9uU2VydmVyVjJBZGFwdGVyIHtcbiAgICBjYW52YXNJZDogc3RyaW5nO1xuXG4gICAgZW5kcG9pbnRVcmw6IHN0cmluZztcblxuICAgIC8qKiAqL1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhc0lkOiBzdHJpbmcsIGVuZHBvaW50VXJsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jYW52YXNJZCA9IGNhbnZhc0lkO1xuICAgICAgICB0aGlzLmVuZHBvaW50VXJsID0gZW5kcG9pbnRVcmw7XG4gICAgfVxuXG4gICAgLyoqICovXG4gICAgZ2V0IGFubm90YXRpb25QYWdlSWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZW5kcG9pbnRVcmx9L3NlYXJjaD91cmk9JHt0aGlzLmNhbnZhc0lkfWA7XG4gICAgfVxuXG4gICAgLyoqICovXG4gICAgYXN5bmMgY3JlYXRlKGFubm90YXRpb246IFYzQW5ub3RhdGlvbikge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5lbmRwb2ludFVybH0vY3JlYXRlYCwge1xuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgU2ltcGxlQW5ub3RhdGlvblNlcnZlclYyQWRhcHRlci5jcmVhdGVWMkFubm8oYW5ub3RhdGlvbiksXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYWxsKCkpXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4gdGhpcy5hbGwoKSk7XG4gICAgfVxuXG4gICAgLyoqICovXG4gICAgYXN5bmMgdXBkYXRlKGFubm90YXRpb246IFYzQW5ub3RhdGlvbikge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7dGhpcy5lbmRwb2ludFVybH0vdXBkYXRlYCwge1xuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgU2ltcGxlQW5ub3RhdGlvblNlcnZlclYyQWRhcHRlci5jcmVhdGVWMkFubm8oYW5ub3RhdGlvbiksXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMuYWxsKCkpXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4gdGhpcy5hbGwoKSk7XG4gICAgfVxuXG4gICAgLyoqICovXG4gICAgYXN5bmMgZGVsZXRlKGFubm9JZDogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChcbiAgICAgICAgICAgIGAke3RoaXMuZW5kcG9pbnRVcmx9L2Rlc3Ryb3k/dXJpPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGFubm9JZCl9YCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIEFjY2VwdDogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5hbGwoKSlcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB0aGlzLmFsbCgpKTtcbiAgICB9XG5cbiAgICAvKiogKi9cbiAgICBhc3luYyBnZXQoYW5ub0lkOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gU0FTIGRvZXMgbm90IGhhdmUgR0VUIGZvciBhIHNpbmdsZSBhbm5vdGF0aW9uXG4gICAgICAgIGNvbnN0IGFubm90YXRpb25QYWdlID0gYXdhaXQgdGhpcy5hbGwoKTtcbiAgICAgICAgaWYgKGFubm90YXRpb25QYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gYW5ub3RhdGlvblBhZ2UuaXRlbXMuZmluZChcbiAgICAgICAgICAgICAgICAoaXRlbTogVjNBbm5vdGF0aW9uKSA9PiBpdGVtLmlkID09PSBhbm5vSWQsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIGFuIEFubm90YXRpb25QYWdlIHdpdGggYWxsIGFubm90YXRpb25zICovXG4gICAgYXN5bmMgYWxsKCk6IFByb21pc2U8QW5ub3RhdGlvblBhZ2U+IHtcbiAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IGZldGNoKHRoaXMuYW5ub3RhdGlvblBhZ2VJZCk7XG4gICAgICAgIGNvbnN0IGFubm9zID0gYXdhaXQgcmVzcC5qc29uKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUFubm90YXRpb25QYWdlKGFubm9zKTtcbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlcyBhIFYyIGFubm90YXRpb24gZnJvbSBhIFYzIGFubm90YXRpb24gKi9cbiAgICBzdGF0aWMgY3JlYXRlVjJBbm5vKHYzYW5ubzogVjNBbm5vdGF0aW9uKTogVjJBbm5vdGF0aW9uIHtcbiAgICAgICAgbGV0IHJlc291cmNlID0gbnVsbDtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodjNhbm5vLmJvZHkpKSB7XG4gICAgICAgICAgICByZXNvdXJjZSA9IHYzYW5uby5ib2R5Lm1hcCgoYikgPT4gdGhpcy5jcmVhdGVWMkFubm9Cb2R5KGIpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc291cmNlID0gdGhpcy5jcmVhdGVWMkFubm9Cb2R5KHYzYW5uby5ib2R5KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2MmFubm86IFYyQW5ub3RhdGlvbiA9IHtcbiAgICAgICAgICAgIC8vIGNvcHkgaWQgaWYgaXQgaXMgU0FTLWdlbmVyYXRlZFxuICAgICAgICAgICAgLy8gVE9ETzogV2hhdCBpZCB0byB1c2UgaWYgaXQgaXMgbm90P1xuICAgICAgICAgICAgXCJAaWRcIjpcbiAgICAgICAgICAgICAgICB2M2Fubm8uaWQgJiYgdjNhbm5vLmlkLnN0YXJ0c1dpdGgoXCJodHRwXCIpXG4gICAgICAgICAgICAgICAgICAgID8gdjNhbm5vLmlkXG4gICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgXCJAY29udGV4dFwiOiBcImh0dHA6Ly9paWlmLmlvL2FwaS9wcmVzZW50YXRpb24vMi9jb250ZXh0Lmpzb25cIixcbiAgICAgICAgICAgIFwiQHR5cGVcIjogXCJvYTpBbm5vdGF0aW9uXCIsXG4gICAgICAgICAgICBtb3RpdmF0aW9uOiBcIm9hOmNvbW1lbnRpbmdcIiwgLy8gVE9ETzogdXNlIHYzYW5uby5tb3RpdmF0aW9uXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIFwiQHR5cGVcIjogXCJvYTpTcGVjaWZpY1Jlc291cmNlXCIsXG4gICAgICAgICAgICAgICAgZnVsbDogKHYzYW5uby50YXJnZXQuc291cmNlIGFzIFNvdXJjZSkuaWQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzb3VyY2UsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh2M2Fubm8udGFyZ2V0LnNlbGVjdG9yKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2M2Fubm8udGFyZ2V0LnNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IHYzYW5uby50YXJnZXQuc2VsZWN0b3IubWFwKChzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2MlNlbGVjdG9yID0gdGhpcy5jcmVhdGVWMkFubm9TZWxlY3RvcihzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2MlNlbGVjdG9yKSByZXR1cm4gdjJTZWxlY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBjaG9pY2UsIGFzc3VtaW5nIHR3byBlbGVtZW50cyBhbmQgMCBpcyBkZWZhdWx0XG4gICAgICAgICAgICAgICAgdjJhbm5vLm9uLnNlbGVjdG9yID0ge1xuICAgICAgICAgICAgICAgICAgICBcIkB0eXBlXCI6IFwib2E6Q2hvaWNlXCIsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHNlbGVjdG9yc1swXSxcbiAgICAgICAgICAgICAgICAgICAgaXRlbTogc2VsZWN0b3JzWzFdLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHYyU2VsZWN0b3IgPSB0aGlzLmNyZWF0ZVYyQW5ub1NlbGVjdG9yKFxuICAgICAgICAgICAgICAgICAgICB2M2Fubm8udGFyZ2V0LnNlbGVjdG9yLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKHYyU2VsZWN0b3IpIHYyYW5uby5vbi5zZWxlY3RvciA9IHYyU2VsZWN0b3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHYzYW5uby50YXJnZXQuc291cmNlIGFzIFNvdXJjZSkucGFydE9mKSB7XG4gICAgICAgICAgICAgICAgdjJhbm5vLm9uLndpdGhpbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJAaWRcIjogKHYzYW5uby50YXJnZXQuc291cmNlIGFzIFNvdXJjZSkucGFydE9mLmlkLFxuICAgICAgICAgICAgICAgICAgICBcIkB0eXBlXCI6IFwic2M6TWFuaWZlc3RcIixcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2MmFubm87XG4gICAgfVxuXG4gICAgLyoqICovXG4gICAgc3RhdGljIGNyZWF0ZVYyQW5ub0JvZHkodjNib2R5OiBWM0JvZHkpIHtcbiAgICAgICAgY29uc3QgdjJib2R5OiBWMkJvZHkgPSB7XG4gICAgICAgICAgICBcIkB0eXBlXCI6IHYzYm9keS5wdXJwb3NlID09PSBcInRhZ2dpbmdcIiA/IFwib2E6VGFnXCIgOiBcImRjdHlwZXM6VGV4dFwiLFxuICAgICAgICAgICAgY2hhcnM6IHYzYm9keS52YWx1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHYzYm9keS5mb3JtYXQpIHtcbiAgICAgICAgICAgIHYyYm9keS5mb3JtYXQgPSB2M2JvZHkuZm9ybWF0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh2M2JvZHkubGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgIHYyYm9keS5sYW5ndWFnZSA9IHYzYm9keS5sYW5ndWFnZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdjJib2R5O1xuICAgIH1cblxuICAgIC8qKiAqL1xuICAgIHN0YXRpYyBjcmVhdGVWMkFubm9TZWxlY3Rvcih2M3NlbGVjdG9yOiBWM1NlbGVjdG9yKTogVjJTZWxlY3RvciB8IG51bGwge1xuICAgICAgICBzd2l0Y2ggKHYzc2VsZWN0b3IudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIlN2Z1NlbGVjdG9yXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgXCJAdHlwZVwiOiBcIm9hOlN2Z1NlbGVjdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2M3NlbGVjdG9yLnZhbHVlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlIFwiRnJhZ21lbnRTZWxlY3RvclwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIFwiQHR5cGVcIjogXCJvYTpGcmFnbWVudFNlbGVjdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIC8vIFNBUyB1c2VzIGxvY2F0aW9uIGluIHh5d2g9eCx5LHcsaCBmb3JtYXQ7IGFubm90b3Jpb3VzIHVzZXMgcGl4ZWw6eCx5LHcsaFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdjNzZWxlY3Rvci52YWx1ZS5yZXBsYWNlKFwieHl3aD1waXhlbDpcIiwgXCJ4eXdoPVwiKSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDcmVhdGVzIGFuIEFubm90YXRpb25QYWdlIGZyb20gYSBsaXN0IG9mIFYyIGFubm90YXRpb25zICovXG4gICAgY3JlYXRlQW5ub3RhdGlvblBhZ2UodjJhbm5vczogVjJBbm5vdGF0aW9uW10pOiBBbm5vdGF0aW9uUGFnZSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHYyYW5ub3MpKSB7XG4gICAgICAgICAgICBjb25zdCB2M2Fubm9zID0gdjJhbm5vcy5tYXAoKGEpID0+XG4gICAgICAgICAgICAgICAgU2ltcGxlQW5ub3RhdGlvblNlcnZlclYyQWRhcHRlci5jcmVhdGVWM0Fubm8oYSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5hbm5vdGF0aW9uUGFnZUlkLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiB2M2Fubm9zLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiQW5ub3RhdGlvblBhZ2VcIixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHYyYW5ub3M7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZXMgYSBWMyBhbm5vdGF0aW9uIGZyb20gYSBWMiBhbm5vdGF0aW9uICovXG4gICAgc3RhdGljIGNyZWF0ZVYzQW5ubyh2MmFubm86IFYyQW5ub3RhdGlvbik6IFYzQW5ub3RhdGlvbiB7XG4gICAgICAgIGxldCBib2R5ID0gbnVsbDtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodjJhbm5vLnJlc291cmNlKSkge1xuICAgICAgICAgICAgYm9keSA9IHYyYW5uby5yZXNvdXJjZS5tYXAoKGI6IFYyQm9keSkgPT4gdGhpcy5jcmVhdGVWM0Fubm9Cb2R5KGIpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvZHkgPSB0aGlzLmNyZWF0ZVYzQW5ub0JvZHkodjJhbm5vLnJlc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdjJ0YXJnZXQgPSB2MmFubm8ub247XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHYydGFyZ2V0KSkge1xuICAgICAgICAgICAgW3YydGFyZ2V0XSA9IHYydGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhcmdldDogVGFyZ2V0ID0ge1xuICAgICAgICAgICAgc2VsZWN0b3I6IHYydGFyZ2V0LnNlbGVjdG9yXG4gICAgICAgICAgICAgICAgPyB0aGlzLmNyZWF0ZVYzQW5ub1NlbGVjdG9yKHYydGFyZ2V0LnNlbGVjdG9yKVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc291cmNlOiB2MnRhcmdldC5mdWxsLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodjJ0YXJnZXQud2l0aGluKSB7XG4gICAgICAgICAgICB0YXJnZXQuc291cmNlID0ge1xuICAgICAgICAgICAgICAgIGlkOiB2MnRhcmdldC5mdWxsLFxuICAgICAgICAgICAgICAgIHBhcnRPZjoge1xuICAgICAgICAgICAgICAgICAgICBpZDogdjJ0YXJnZXQud2l0aGluW1wiQGlkXCJdLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIk1hbmlmZXN0XCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcIkNhbnZhc1wiLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJAY29udGV4dFwiOiBcImh0dHA6Ly93d3cudzMub3JnL25zL2Fubm8uanNvbmxkXCIsXG4gICAgICAgICAgICBpZDogdjJhbm5vW1wiQGlkXCJdLFxuICAgICAgICAgICAgbW90aXZhdGlvbjogXCJjb21tZW50aW5nXCIsXG4gICAgICAgICAgICB0eXBlOiBcIkFubm90YXRpb25cIixcbiAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgIGJvZHksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqICovXG4gICAgc3RhdGljIGNyZWF0ZVYzQW5ub0JvZHkodjJib2R5OiBWMkJvZHkpOiBWM0JvZHkge1xuICAgICAgICBjb25zdCB2M2JvZHk6IFYzQm9keSA9IHtcbiAgICAgICAgICAgIHR5cGU6IFwiVGV4dHVhbEJvZHlcIixcbiAgICAgICAgICAgIHZhbHVlOiB2MmJvZHkuY2hhcnMsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh2MmJvZHkuZm9ybWF0KSB7XG4gICAgICAgICAgICB2M2JvZHkuZm9ybWF0ID0gdjJib2R5LmZvcm1hdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodjJib2R5Lmxhbmd1YWdlKSB7XG4gICAgICAgICAgICB2M2JvZHkubGFuZ3VhZ2UgPSB2MmJvZHkubGFuZ3VhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHYyYm9keVtcIkB0eXBlXCJdID09PSBcIm9hOlRhZ1wiKSB7XG4gICAgICAgICAgICB2M2JvZHkucHVycG9zZSA9IFwidGFnZ2luZ1wiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2M2JvZHk7XG4gICAgfVxuXG4gICAgLyoqICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBzdGF0aWMgY3JlYXRlVjNBbm5vU2VsZWN0b3IodjJzZWxlY3RvcjogVjJTZWxlY3Rvcik6IGFueSB7XG4gICAgICAgIC8vIFRPRE86IHR5cGUtc2FmZSB0aGlzIHJldHVybiB2YWx1ZVxuICAgICAgICBzd2l0Y2ggKHYyc2VsZWN0b3JbXCJAdHlwZVwiXSkge1xuICAgICAgICAgICAgY2FzZSBcIm9hOlN2Z1NlbGVjdG9yXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJTdmdTZWxlY3RvclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdjJzZWxlY3Rvci52YWx1ZSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSBcIm9hOkZyYWdtZW50U2VsZWN0b3JcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcIkZyYWdtZW50U2VsZWN0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgY29uZm9ybXNUbzogXCJodHRwOi8vd3d3LnczLm9yZy9UUi9tZWRpYS1mcmFncy9cIixcbiAgICAgICAgICAgICAgICAgICAgLy8gU0FTIHJldHVybnMgbG9jYXRpb24gaW4geHl3aD14LHksdyxoIGZvcm1hdDsgYW5ub3RvcmlvdXMgdXNlcyBwaXhlbDp4LHksdyxoXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2MnNlbGVjdG9yLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHYyc2VsZWN0b3IudmFsdWUucmVwbGFjZShcInh5d2g9XCIsIFwieHl3aD1waXhlbDpcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCJcIixcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSBcIm9hOkNob2ljZVwiOlxuICAgICAgICAgICAgICAgIC8qIGNyZWF0ZSBhbHRlcm5hdGUgc2VsZWN0b3JzICovXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgdjJzZWxlY3Rvci5kZWZhdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY3JlYXRlVjNBbm5vU2VsZWN0b3IodjJzZWxlY3Rvci5kZWZhdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB2MnNlbGVjdG9yLml0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5jcmVhdGVWM0Fubm9TZWxlY3Rvcih2MnNlbGVjdG9yLml0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBTZXR0aW5ncyB9IGZyb20gXCIuLi90eXBlcy9TZXR0aW5nc1wiO1xuaW1wb3J0IHsgU291cmNlIH0gZnJvbSBcIi4uL3R5cGVzL1YzL1NvdXJjZVwiO1xuXG5jb25zdCBhZGp1c3RUYXJnZXRTb3VyY2UgPSAoXG4gICAgc291cmNlOiBTb3VyY2UgfCBzdHJpbmcsXG4gICAgc2V0dGluZ3M6IFNldHRpbmdzLFxuKTogU291cmNlID0+IHtcbiAgICAvLyBhbm5vdG9yaW91cyBzZXRzIHRoZSB0YXJnZXQgc291cmNlIGFzIGEgc3RyaW5nIGlkO1xuICAgIC8vIHdlIG5lZWQgdG8gc3RydWN0dXJlIGl0IHRvIGFkZCBjYW52YXMvbWFuaWZlc3QgaW5mb1xuICAgIGlmICh0eXBlb2Ygc291cmNlID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgLy8gYWRkIG1hbmlmZXN0IGlkIHRvIGFubm90YXRpb25cbiAgICAgICAgc291cmNlID0ge1xuICAgICAgICAgICAgLy8gdXNlIHRoZSBjb25maWd1cmVkIHRhcmdldCAoc2hvdWxkIGJlIGNhbnZhcyBpZClcbiAgICAgICAgICAgIGlkOiBzZXR0aW5ncy50YXJnZXQsXG4gICAgICAgICAgICAvLyBsaW5rIHRvIGNvbnRhaW5pbmcgbWFuaWZlc3RcbiAgICAgICAgICAgIHBhcnRPZjoge1xuICAgICAgICAgICAgICAgIGlkOiBzZXR0aW5ncy5tYW5pZmVzdCxcbiAgICAgICAgICAgICAgICB0eXBlOiBcIk1hbmlmZXN0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogXCJDYW52YXNcIixcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFkanVzdFRhcmdldFNvdXJjZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oNjA3KTtcbiJdLCJuYW1lcyI6WyJBbm5vTG9hZEV2ZW50IiwiRXZlbnQiLCJhbm5vIiwic2V0dGluZ3MiLCJhZGFwdGVyIiwidGFyZ2V0IiwiYW5ub3RhdGlvbkVuZHBvaW50IiwiYWxsIiwidGhlbiIsImFubm90YXRpb25QYWdlIiwic2V0QW5ub3RhdGlvbnMiLCJpdGVtcyIsImRvY3VtZW50IiwiZGlzcGF0Y2hFdmVudCIsIm9uIiwiYXN5bmMiLCJhbm5vdGF0aW9uIiwic291cmNlIiwiY3JlYXRlIiwiY29uc29sZSIsImxvZyIsImFkZEFubm90YXRpb24iLCJwcmV2aW91cyIsImlkIiwidXBkYXRlIiwiZGVsZXRlIiwiU2ltcGxlQW5ub3RhdGlvblNlcnZlclYyQWRhcHRlciIsImNvbnN0cnVjdG9yIiwiY2FudmFzSWQiLCJlbmRwb2ludFVybCIsInRoaXMiLCJhbm5vdGF0aW9uUGFnZUlkIiwiZmV0Y2giLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImNyZWF0ZVYyQW5ubyIsImhlYWRlcnMiLCJBY2NlcHQiLCJtZXRob2QiLCJjYXRjaCIsImFubm9JZCIsImVuY29kZVVSSUNvbXBvbmVudCIsImZpbmQiLCJpdGVtIiwicmVzcCIsImFubm9zIiwianNvbiIsImNyZWF0ZUFubm90YXRpb25QYWdlIiwic3RhdGljIiwidjNhbm5vIiwicmVzb3VyY2UiLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJiIiwiY3JlYXRlVjJBbm5vQm9keSIsInYyYW5ubyIsInN0YXJ0c1dpdGgiLCJ1bmRlZmluZWQiLCJtb3RpdmF0aW9uIiwiZnVsbCIsInNlbGVjdG9yIiwic2VsZWN0b3JzIiwicyIsInYyU2VsZWN0b3IiLCJjcmVhdGVWMkFubm9TZWxlY3RvciIsImRlZmF1bHQiLCJwYXJ0T2YiLCJ3aXRoaW4iLCJ2M2JvZHkiLCJ2MmJvZHkiLCJwdXJwb3NlIiwiY2hhcnMiLCJ2YWx1ZSIsImZvcm1hdCIsImxhbmd1YWdlIiwidjNzZWxlY3RvciIsInR5cGUiLCJyZXBsYWNlIiwidjJhbm5vcyIsInYzYW5ub3MiLCJhIiwiY3JlYXRlVjNBbm5vIiwiY3JlYXRlVjNBbm5vQm9keSIsInYydGFyZ2V0IiwiY3JlYXRlVjNBbm5vU2VsZWN0b3IiLCJ2MnNlbGVjdG9yIiwiY29uZm9ybXNUbyIsIm1hbmlmZXN0IiwiX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fIiwiX193ZWJwYWNrX2V4cG9ydHNfXyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImNhY2hlZE1vZHVsZSIsImV4cG9ydHMiLCJtb2R1bGUiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwiY2FsbCJdLCJzb3VyY2VSb290IjoiIn0=