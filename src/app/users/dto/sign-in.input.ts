import { InputType, OmitType } from '@nestjs/graphql'
import { SignUpInput } from './sign-up.input'

@InputType()
export class SignInInput extends OmitType(SignUpInput, ['name'] as const) {}
