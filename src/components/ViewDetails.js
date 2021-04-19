import React, { Component } from 'react'
// import {withRouter} from 'react-router-dom'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
class ViewDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
             owners:[],
        }
    }
    fetchAllOwners= ()=>
    {
        fetch(`https://beginner-demo.herokuapp.com/owner/getOwners`,
            {method:'GET',
             headers:{'Content-Type':'application/json',
             }
            
            })
            .then(res => {
                console.log("Res")
                console.log(res);
                return res.json();})
            .then(data=>{
                console.log("Data")
                console.log(data);
                if(data.code==403)
                {
                    this.setState({
                        ...this.state,
                    })
                }
                else
                {
                this.setState({
                    ...this.state,
                    owners:data.data,
                })}
            })
            .catch(error => {
                console.log("Error")
                console.log(JSON.parse(JSON.stringify(error)))
            this.setState({
                ...this.state,
            })});
    }
    componentDidMount()
    {
    //     //console.log(new Date());
        // if(localStorage.getItem("role")=="admin")
            // console.log(this.state.owners);
            this.fetchAllOwners();

        // else
        //   this.fetchBillsByMobile()
    }    
    render() {
        return (
            <div className="container" >
            <Table  striped bordered hover size="sm" className="m-2 w-100 table table-striped table-bordered dt-responsive nowrap">
                    <Thead className="bg-success text-white">
                        <Tr>
                            <Th >Owner Id</Th>
                             <Th>Name</Th>
                            <Th >Password</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    <h1>Details</h1>
                        {this.state.owners.map((owner,index)=>{
                            var id=index;
                            return(
                            //     <div key={index} className="bg-white">
                            //         <h1>{owner.ownerId}</h1>
                            //         <h1>{owner.Name}</h1>
                            //         <h1>{owner.password}</h1>
                            //   </div>
                                <Tr key={index} className="bg-white">
                                    <Td>{owner.ownerId}</Td>
                                    <Td>{owner.Name}</Td>
                                    <Td>{owner.password}</Td>
                              </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </div>
         
        );
    }
}

export default ViewDetails
