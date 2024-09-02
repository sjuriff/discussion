/*
Vi lager path-helpers slik at vi har alle stiene våre på en plass.
Hvis noen stier skulle dnre seg slipper vi å gå gjennom pages og komponenter og funksjoner for å sjekke
at alle linker og revalidate path stiene er oppdatert. High coohesion low coopling, gjenbruk osv.
*/

const paths = {
    home(){
        return '/';
    },
    //slug = url safe name of some resource
    topicShow(topicSlug: string){
        return `/topics/${topicSlug}`;
    },
    postCreate(topicSlug: string){
        return `/topics/${topicSlug}/posts/new`;
    },
    postShow(topicSlug: string, postID: string){
        return `/topics/${topicSlug}/posts/${postID}`;
    }

}
export default paths