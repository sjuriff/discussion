//So we dont have to import sever actions from different files
//i will import the bigger server action functions in seperate files
//and export them here so we can import all server actions from index.ts
export {signInWithGoogle} from './sign-in-google'
export {signInWithGithub} from './sign-in-github'
export {signOut} from './sign-out'
export {createComment} from './create-comment'
export {createTopic} from './create-topic'
export {createPost} from './create-post'
export {search} from './search'


