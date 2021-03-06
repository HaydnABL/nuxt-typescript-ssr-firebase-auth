import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { AuthUser, User } from 'types-module'

@Component({
  components: {}
})
export default class BaseModule extends Vue {
  @Prop({ type: Boolean, required: true }) isMyProfile: boolean
  @Prop({ required: true }) authUser: AuthUser
  @Prop({ type: Object, required: true }) user: User
}
