"use client"
import React from 'react'
import ReactSelect from 'react-select'
interface SelectProps{
      value?:Record<string, any>
      label: string
      onChange:(value:Record<string, any>)=>void;
      options: Record<string, any>[]
      disabled?:boolean;
}


function Select({label, value, onChange, options, disabled}:SelectProps) {
      return (
            <div className='z-[9999] '>
                  <label className='block text-sm font-medium leading-6 text-gray-900'>
                        {label}
                  </label>
                  <div className='mt-2 z-auto'>
                  <ReactSelect
                        isDisabled={disabled}
                        value={value}
                        onChange={onChange}
                        isMulti
                        options={options}
                        menuPortalTarget={document.body}
                        styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 })
                        }}
                        classNames={{
                        control: () => 'text-sm',
                        }}
                        />

                  </div>
            </div>
      )
}

export default Select