/*
Creating path-helpers so that we have all the paths in one place.
If some paths were to change, we dont need to go trough pages, components and function  to check 
if all links and revalidate path paths are up to date . High coohesion low coopling etc.
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