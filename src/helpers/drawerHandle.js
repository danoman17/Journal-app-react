//helper that handle the drawer component state

export const drawerHandle = ( setOpen, value ) =>(event) => {

    if(event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")){
        return;
    }

    setOpen(value); // setting the value 

};