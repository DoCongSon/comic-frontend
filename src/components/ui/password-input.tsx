import React, { useState } from 'react'
import { Input, InputProps } from './input'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { cx } from 'class-variance-authority'

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className='relative'>
      <Input type={showPassword ? 'text' : 'password'} ref={ref} {...props} className={cx('pr-10', className)} />
      <div className='cursor-pointer absolute right-3 top-[11px]' onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
      </div>
    </div>
  )
})
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
