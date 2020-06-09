import React, { Component } from 'react';
import Isvg from 'react-inlinesvg';
import image from '../../../assets/svg/image.svg';

class Image extends Component {
    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.state = {
        };
    }

    selectFile(e) {
        let input = e.target;
        if (input.files && input.files[0]) {
            this.setState({
                _loading: true
            })

            let formData = new FormData();
            formData.append('file', input.files[0]);

            fetch('http://127.0.0.1:8282/api/upload/v1', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    //'Content-Type': 'multipart/form-data',
                    //'Authorization': `Bearer ${localStorage.getItem('token')}`

                },
                body: formData
            }).then((res) => res.json()).then((result) => {
                if (result.file) {
                    this.props.onChange(result.file);
                }
                this.setState({
                    _loading: null
                })

            });

        }
    }
    render() {
        return (
            <div className="image-picker single-image-picker">
                <input type="file" onChange={this.selectFile} />
                {this.props.value ?
                    <img src={this.props.value} />
                    :
                    <div className="no-image">
                        <Isvg src={image} />
                        <span className="text">Choose image</span>
                        {
                            this.state._loading ?
                                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                                :
                                null
                        }
                    </div>
                }
            </div>
        );
    }
}

export default Image;