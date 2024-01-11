import "./App.css"
function Table({label, quantity, unit}) {
    return (
        <div>
            <table>
                <tbody>
                  <tr>
                    <td className="label">{label}</td>
                    <td className="value">{quantity.toFixed()} {unit}</td>
                  </tr>
                </tbody>
            </table>
        </div>
        
    )
}
export default Table;
