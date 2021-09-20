# Web Performance
- what is it
- some browser theory
- angular specifics
- using lighthouse
- using the performance tab
Note:
- introduction
- ce qu'on va voir tout ça



## Intro / What is Web PERF
- load times
- refresh times
- perceived "slowness"


## Enhancing load times
- small bundles
- avoid (too much) JS
- lazy load things below the fold


## Enhancing refresh times
- give feedback for loading
- avoid long animations
- skeleton components



## Repaint / Reflow
How does a browser render stuff ?
![](/talks/web-perf/render-tree.png)


### Repaint
- when a dom element needs to be re-rendered
- means the browser "draws" something on screens


### Reflow
- the browser needs to refresh the "layout"
- user-blocking process
- should be avoided
Note:
- 



### Web vitals
https://web.dev/vitals/

- LCP
- CLS
- FID


#### FCP/LCP
__Largest Contentful Paint__
- loading performance
- FCP: first
Note:
- mesure network / taille de la page


#### CLS
__Content Layout Shift__
- measures page stability
- things moved "after" the initial page load
Note:
- évitons les reflow
- pas de repaint après le lancement du JS
- tailles d'images fixées


#### FID
__First Input Delay__
- measures interactivity
- time when first user event is handled



## The DOM is slow
- Every time the DOM changes browser needs to recalculate the CSS, do a layout and repaint the web page
- Accessing and mutating a dom node can cause reflows
- Javascript Objects modifications is very fast compared to DOM changes


### Modern frameworks <br/> abstracts the DOM
- diff algorithms
- virtual DOM
- abstract component tree
Note:
- introduce the next part with angular



## Performant code <br/> with Angular
- every framework has its "footguns"
- be aware of its internals


#### Angular component lifecycle
![](/talks/web-perf/angular-lifecycle.png)
Note:
- https://angular.io/guide/lifecycle-hooks
- éviter de mettre du code métier dans ces méthodes
- principe du onChanges déclenché
- nettoyage onDestroy


#### Zone.js
- Zone.js is a microtask manager
- it is what is used to magically detect changes
- It patches browser mechanism to support change detection:

    - all browser events (click, mouseover, keyup, etc.)
    - setTimeout() and setInterval()
    - Ajax HTTP requests



## Angular perf techniques
- randomly choosen for your convenience


#### ChangeDetectionStrategy.OnPush
- by default: 
  - angular launches a detection cycle everytime "something" changes
- with onPush:
  - objects diffs are made by value
  - inputs are checked individually


#### running outside the angular zone.
```typescript
class InDaZoneComponent{
    constructor(private zone: NgZone){}

    @HostListener("window:resize")
    onWindowResize(){
        this.zone.runOutsideAngular(()=>{
            // heavy computation stuff
            this.zone.run(() => {
                // run inside angular zone again
            })
        });
    }
}
```


#### *ngFor with trackBy
- when rendering a loop / items in an array
- diff is made by object reference (`===`)
- we can help angular decide if there are some changes or not
```html
<div *ngFor="let item of contents; trackByFn: trackById">
</div>
```
in the component:
```typescript
trackById(index: number, item: TypedObject) {
    return item.identifier;
}
```
https://angular.io/api/core/TrackByFunction


#### lazy load modules
- since angular 9, it is now possible to lazy load modules
 and components "on demand"
- historically it was only with routes, not so simple with modules
```typescript
const routes: Routes = [
    { 
      path: 'heroes',
      loadChildren: () => import('./heroes.module')
                            .then(mod => mod.HeroesModule)
    }
];
```


#### lazy load components
now with angular 9 we can use the "import" syntax:
```typescript
@NgModule({/** declarations etc.. */})
class OtherModule{
    static getComponent(): typeof MyComponent {
        return MyComponent;
    }
}
```
and in a component :
```typescript
loadLazyModule() {
    import("./other.module.ts").then((m) => {
        const component: MyComponent = m.getComponent();
        // instanciate it in the view...
    });
}
```


#### optimize template expressions

```html
<div>
    {{ functionCalled() }}
</div>
```
- method will be called on every change detection
- if the method call can be changed by an attribute on the component, DO IT.


#### Use pure pipes
- pure: only operates on inputs, no dependencies
- pipes are cacheable between view renders
- can replace "formatting" method or heavy expressions
```typescript
@Pipe({
    name: "util",
    pure: true
})
class UtilPipe implements PipeTransform {
    transform(value) {
        return heavyFunction(value)
    }
}
```


#### Use the ~force~ router luke!
- using guards and resolvers
- won't cause component renders
- will prevent loading module if condition not met or errors


#### Minimize js in bundles
- how to generate a sourcemap graph:
```bash
npx ng build -c=fr_fr --stats-json
npx webpack-bundle-analyzer build/browser/fr-FR/stats.json
```
- demo



# Lighthouse & the <br/> Performance tab
- we'll focus on chrome
- a performance tab is available in every browser


## Comment faire un tir lighthouse
- recommendations: 
  - disable all plugins/extensions
  - empty localstorage
- demo


## Analyser les résultats d'un tir lighthouse
- demo



## Webtools, onglet performance
- https://googlechrome.github.io/devtools-samples/jank/


## Comment enregistrer une session
- push the record button
- save to file
- open file


## Comment analyser un flame graph
- demo

Note:
- montrer les options network cpu / throttle
- onglet layers sur une seléction de frame
- 


### (Res)Sources
Repaint/Reflow:
- https://medium.com/swlh/what-the-heck-is-repaint-and-reflow-in-the-browser-b2d0fb980c08
- https://developers.google.com/speed/docs/insights/browser-reflow 


Change detection angular
- https://vsavkin.com/change-detection-in-angular-2-4f216b855d4c
- https://hackernoon.com/everything-you-need-to-know-about-change-detection-in-angular-8006c51d206f
- https://blog.angular-university.io/how-does-angular-2-change-detection-really-work/


Various perf tricks:
- https://blog.bitsrc.io/10-tricks-to-optimize-your-angular-app-44208f616bf0
- https://github.com/mgechev/angular-performance-checklist
- https://medium.com/@ebrehault_25985/angular-9-makes-lazy-loading-without-routing-so-easy-18774092ed34


Lighthouse
- https://developer.chrome.com/docs/devtools/evaluate-performance/
- https://developer.chrome.com/docs/devtools/evaluate-performance/reference/
Angular devtools:
- https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh



# The End


- Questions ?