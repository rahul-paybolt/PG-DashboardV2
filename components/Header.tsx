import { Input } from '@nextui-org/input'
import React from 'react'
import { SearchIcon } from './icons'
import {Divider} from "@nextui-org/divider";
const Header = () => {
  return (
    <div>
      <div className='flex items-center justify-between px-4 py-4 flex-grow ml-[250px]'>
        <span>DashBoard</span>
        <Input
            classNames={{
              base: "max-w-full sm:max-w-[16rem] h-10 ",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal bg-white text-default-500 border-[1px] rounded-md",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
      </div>
          <Divider className='my-4 dark:bg-slate-50'/>
    </div>
  )
}

export default Header
