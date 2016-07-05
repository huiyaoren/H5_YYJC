/**
 * Created by wslsh on 2016/6/20.
 */
function Director($viewport){
    var self = this;
    //this.viewport = $viewport;
    this.runScene = function(scene){
        $viewport.empty();

        //console.log($viewport);
        //console.log(scene);
        $viewport.append(scene.mainBody());
        if(scene.run){
            scene.run();
        }
    }
}

