import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import Isvg from 'react-inlinesvg';


import Dropzone from 'react-dropzone';
import GridLayout from 'react-grid-layout';

import deleteIcon from '../../../assets/svg/delete.svg';
import image from '../../../assets/svg/image.svg';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.dropzone = React.createRef()
        this.getBase64 = this.getBase64.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.state = {
            files: [],
            imagesLayout: [],
            _uploading: [],
        };
    }


    componentDidMount() {
        let files = [];
        let imagesLayout = [];
        for (let i = 0; i < this.props.value.length; i++) {
            files.push(this.props.value[i]);
            imagesLayout.push(i);
        }

        this.setState({
            files: files,
            imagesLayout: imagesLayout,
        });

    }



    componentDidUpdate(prevProps, prevState) {
        if ((!this.state.files.length && this.props.value.length) && !(prevState.files.length && !this.state.files.length)) {
            console.log(this.props.value);
            let files = [];
            let imagesLayout = [];
            for (let i = 0; i < this.props.value.length; i++) {
                files.push(this.props.value[i]);
                imagesLayout.push(i);
            }

            this.setState({
                files: files,
                imagesLayout: imagesLayout,
            });

        }

        if (prevState.files.length && !this.state.files.length) {
            console.log("TTTTTTTTTTTT");
            let files = [];
            for (let i = 0; i < this.state.imagesLayout.length; i++) {
                files.push(this.state.files[this.state.imagesLayout[i]]);
            }

            this.props.onChange(files);

        }
    }


    registerSocketIOEvents() {
        if (this.state._registeredEvents)
            return;

        this.setState({
            _registeredEvents: true
        });

        this.props.socketIOClient.on('adminUpload', (data) => {
            console.log(data);
            if (data.successful) {
                let files = this.state.files;
                let _uploading = this.state._uploading;
                files[data.name] = data.file.url;
                _uploading[data.name] = null;

                this.setState({
                    _uploading: _uploading,
                    files: files
                }, () => {
                    this.props.onChange(this.state.files);
                })
            }
        });

        /*       this.props.socketIOClient.on('adminUploadChunk', (data) => {
       
                   if (data.successful && data.file) {
                       console.log(data);
                       let files = this.state.files;
                       let _uploading = this.state._uploading;
                       files[data.name] = data.file.url;
                       _uploading[data.name] = null;
       
                       this.setState({
                           _uploading: _uploading,
                           files: files
                       }, () => {
                           this.props.onChange(this.state.files);
                       })
                   }
               }
               );*/

    }


    removeImage(idx) {
        console.log(idx);

        console.log('removeImage');
        let files = this.state.files.slice(0, idx).concat(this.state.files.slice(idx + 1, this.state.files.length))
        let imagesLayout = this.state.imagesLayout.slice(0, idx).concat(this.state.imagesLayout.slice(idx + 1, this.state.imagesLayout.length))
        let _uploading = this.state._uploading.slice(0, idx).concat(this.state._uploading.slice(idx + 1, this.state._uploading.length))
        this.setState({
            files: files,
            imagesLayout: imagesLayout,
            _uploading: _uploading
        });
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let encoded = reader.result;
                resolve(encoded);
            };
            reader.onerror = error => reject(error);
        });
    }


    async onDrop(imageFiles) {

        let imagesLayout = [];
        let images = [];
        let _uploading = [];

        for (let i = 0; i < imageFiles.length; i++) {
            var base64Image = await this.getBase64(imageFiles[i]);

            /*let size = imageFiles[i].size;
            console.log(size);
            var l = base64Image.length, lc = 0, chunks = [], c = 0, chunkSize = 200 * 1024;
            for (; lc < l; c++) {
                chunks[c] = base64Image.slice(lc, lc += chunkSize);
                //console.log(chunks[c].length);
                this.props.socketIOClient.emit("adminUploadChunk", {
                    data: chunks[c],
                    index: c,
                    chunkSize: chunkSize,
                    type: imageFiles[i].type,
                    name: this.state.files.length + i,
                    size: base64Image.length
                });
            }*/
            let name = this.state.files.length + i;
            // fetch('http://127.0.0.1:4000/admin/upload', {
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${localStorage.getItem('token')}`

            //     },
            //     body: JSON.stringify({ file: base64Image })
            // }).then((res) => res.text()).then((img) => {
            //     /*this.props.onChange(img);
            //     this.setState({
            //         _loading: null
            //     })*/

            //     let files = this.state.files;
            //     let _uploading = this.state._uploading;
            //     files[name] = img;
            //     _uploading[name] = null;

            //     this.setState({
            //         _uploading: _uploading,
            //         files: files
            //     }, () => {
            //         this.props.onChange(this.state.files);
            //     })
            // });
            let formData = new FormData();
            formData.append('file', imageFiles[i]);

            fetch('http://127.0.0.1:8080/admin/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`

                },
                body: formData
            }).then((res) => res.text()).then((img) => {
                let files = this.state.files;
                let _uploading = this.state._uploading;
                files[name] = img;
                _uploading[name] = null;

                this.setState({
                    _uploading: _uploading,
                    files: files
                }, () => {
                    this.props.onChange(this.state.files);
                })
            });





            /*this.props.socketIOClient.emit("adminUpload", {
                data: base64Image,
                name: this.state.files.length + i,
                type: imageFiles[i].type
            });*/

            images.push(null);
            imagesLayout.push(i);
            _uploading.push(true);
        }

        this.setState({
            files: this.state.files.concat(images),
            imagesLayout: this.state.imagesLayout.concat(imagesLayout),
            _uploading: this.state._uploading.concat(_uploading)
        }, () => {
            let files = [];
            for (let i = 0; i < this.state.imagesLayout.length; i++) {
                files.push(this.state.files[this.state.imagesLayout[i]]);
            }

            this.props.onChange(files);
        });




    }



    onLayoutChange(layout) {
        //console.log(layout);
        let arr = [];
        for (let i = 0; i < layout.length; i++) {
            arr.push({ idx: layout[i].i, position: layout[i].y * 3 + layout[i].x });
        }

        arr.sort(function (a, b) { return (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0); });
        let imagesLayout = [];
        for (let i = 0; i < arr.length; i++) {
            imagesLayout.push(parseInt(arr[i].idx));
        }


        this.setState({
            imagesLayout: imagesLayout
        }, () => {
            let files = [];
            for (let i = 0; i < this.state.imagesLayout.length; i++) {
                files.push(this.state.files[this.state.imagesLayout[i]]);
            }

            this.props.onChange(files);


        });

    }


    render() {

        let images = [];

        if (this.state.files) {
            let x = 0;
            let y = 0;
            for (let i = 0; i < this.state.files.length; i++) {
                let layout = { i: i.toString(), x: x, y: y, w: 1, h: 1 };
                let item = {
                    content: (
                        <div className="image" key={i.toString()} data-grid={layout}>

                            <div className="image-wrap">

                                <img src={this.state.files[i]} />
                                <div className={'delete'} onClick={() => this.removeImage(i)}>
                                    <Isvg src={deleteIcon} />
                                </div>
                            </div>
                        </div>
                    )
                };
                images.push(item);
                x++;
                if (x >= 3) {
                    y++;
                    x = 0;
                }
            }



        }


        return (
            <div className="input-wrap">
                <label>{this.props.label}</label>
                <div className="file-drop" ref={(ref) => this.dropzone = ref}>

                    <Dropzone
                        onDrop={this.onDrop}
                        className='dropzone'
                        activeClassName='active-dropzone'
                        multiple={true}>

                        <button button type="button"><i className="mdi mdi-file-outline"></i></button>




                    </Dropzone>

                    <div className="no-image">
                        <Isvg src={image} />
                        <span className="text">Izaberi sliku</span>
                    </div>


                    <GridLayout
                        className="grid-layout"
                        onLayoutChange={this.onLayoutChange}
                        width={this.dropzone.offsetWidth}
                        rowHeight={146}

                        compactType={'horizontal'}
                        isResizable={false}
                        verticalCompact={true}
                        horizontalCompact={true}
                        useCSSTransforms={true}
                        cols={3}
                    >

                        {
                            images.map((image, idx) => {
                                return (
                                    image.content
                                );
                            })
                        }
                    </GridLayout>


                </div>





            </div>
        );
    }
}

export default Gallery;