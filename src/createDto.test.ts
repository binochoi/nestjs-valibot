import { createDto } from './createDto'
import * as v from 'valibot'

describe('craeteDto', () => {
  it('should to create correct DTO', () => {
    const UserSchema = v.object({
        nick: v.string()
    })
    const mock = { nick: 'bino' };

    class UserDto extends createDto(UserSchema) {}
    const user = UserDto.create(mock)
    expect(user).toEqual(mock)
  })
})
