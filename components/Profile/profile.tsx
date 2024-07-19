import React from "react";
import {User} from "@nextui-org/user";
export default function Profile(isCollapsed:boolean) {
  return (
    <User   
      name={isCollapsed ? "" : "Rahul"} 
      description={isCollapsed ? "" : "rahul@paybolt.in"} 
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
      }}
    />
  );
}
