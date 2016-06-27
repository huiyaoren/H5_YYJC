/**
 * Created by wslsh on 2016/6/20.
 */
function Director($viewport){
    this.viewport = $viewport;
    this.runScene = function(scene){
        $viewport.empty();
        $viewport.append(scene.mainBody());
        if(scene.run){
            scene.run();
        }
    }
}