export default function Chips({children,...rest}){

    return (
        <span style={rest.styles} className={rest.className}>{children}</span>
    )
}