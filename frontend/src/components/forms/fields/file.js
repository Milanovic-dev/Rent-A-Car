
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
} from 'reactstrap';

class File extends Component {
    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);

        this.state = {

        };
    }

    selectFile(e) {
        let input = e.target;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            console.log(input.files);
            if (input.files[0].name.indexOf('.pdf') == -1){
                return;
            }
            this.setState({
                name: input.files[0].name
            })
            reader.onload = async (e) => {
                this.props.onChange(e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    render() {
        return (
            <div className="form-field form-file-field">
                <input type="file" onChange={this.selectFile} />
                <div>
                    {this.props.value ?
                        <span className="text">{this.state.name}</span>
                        :
                        <span className="text">{this.props.placeholder}</span>
                    }
                    <button type="button">Datei Hochladen</button>
                </div>
            </div>


        );
    }
}

export default File;