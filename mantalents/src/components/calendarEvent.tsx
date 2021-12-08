
export const CalendarEvent=({event}: any )=>{
    const {title, name} = event;
    return (
        <>
            <span> {title} </span>
            <strong> {name} </strong>
        </>
    )
}