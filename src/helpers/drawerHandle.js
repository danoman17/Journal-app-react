
export const drawerHandle = ( setOpen, value ) =>(event) => {

    if(event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")){
        return;
    }

    setOpen(value);

};