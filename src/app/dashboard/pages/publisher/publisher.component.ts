import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PublisherService } from 'src/app/services/publisher.service';
import { Publisher } from 'src/app/model/publisher';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;
@Component({
    selector: 'app-publisher',
    templateUrl: './publisher.component.html',
    styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {

    publishers: Observable<Publisher[]>;
    key = 'publisherName';
    reverse = false;
    p = 1;
    row = 5;
    search: any;

    idForUpdate = null;
    idForDelete = null;
    publisherForm: FormGroup;

    constructor(private pubService: PublisherService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.loadPublishers();
        this.createForm();
    }


    createForm() {
        // tslint:disable-next-line:max-line-length
        const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const phonePattern: RegExp = /^(01[1-9](\d{8})$)/;
        this.publisherForm = this.formBuilder.group({
            publisherName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
            contactNo: ['', [Validators.required, Validators.pattern(phonePattern)]],
            email: [null, [Validators.required, Validators.pattern(emailregex)]],
            address: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(200)]],
        });
    }



    viewData(id: any) {
        this.pubService.getById(id).subscribe(res => {
            document.getElementById('publisherName').innerHTML = res['publisherName'];
            document.getElementById('email').innerHTML = res['email'];
            document.getElementById('contactNo').innerHTML = res['contactNo'];
            document.getElementById('address').innerHTML = res['address'];
            $('#publisherViewModal').modal('show');

        });
    }

    createStart() {
        this.publisherForm.reset();
        document.getElementById('btnSubmit').style.display = 'block';
        document.getElementById('btnSubmit').innerHTML = 'Save';
        $('#publisherModal').modal('show');
        // this.submitted = false;
    }

    submit() {
        if (this.idForUpdate == null) {
            this.pubService.create(this.publisherForm.value).subscribe(res => {
                this.loadPublishers();
                $('#publisherModal').modal('hide');
                this.publisherForm.reset();
            });
        } else {
            this.pubService.update(this.idForUpdate, this.publisherForm.value).subscribe(res => {
                this.loadPublishers();
                this.idForUpdate = null;
                $('#publisherModal').modal('hide');
                this.publisherForm.reset();
            });
        }
    }


    udpateStart(id: any) {
        this.pubService.getById(id).subscribe(res => {
            this.publisherForm.controls.publisherName.setValue(res.publisherName);
            this.publisherForm.controls.email.setValue(res.email);
            this.publisherForm.controls.contactNo.setValue(res.contactNo);
            this.publisherForm.controls.address.setValue(res.address);
            this.idForUpdate = id;
            document.getElementById('btnSubmit').innerHTML = 'Update';
            document.getElementById('btnSubmit').style.display = 'block';
            $('#publisherModal').modal('show');
        });
    }


    deleteStart(id: any) {
        this.idForDelete = id;
        $('#confirm-delete').modal('show');
    }

    sDeleteConfirm() {
        if (this.idForDelete != null) {
            this.pubService.softDelete(this.idForDelete).subscribe(res => {
                this.loadActiveAuthors();
                $('#confirm-delete').modal('hide');
                console.log(res);
                this.idForDelete = null;
                this.publisherForm.reset();
            });
        }
    }


    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

    loadPublishers() {
        this.publishers = this.pubService.getAllPublishers();
    }

    loadActiveAuthors() {
        this.publishers = this.pubService.getActiveAuthors();
    }

    openModal() {
        $('#publisherModal').modal('show');
    }
    closeModal() {
        $('#publisherModal').modal('hide');
    }

    openViewModal() {
        $('#publisherViewModal').modal('show');
    }
    closeViewModal() {
        $('#publisherViewModal').modal('hide');
    }
    // for email validation
    getErrorEmail() {
        return this.publisherForm.get('email').hasError('required') ? 'Field is required' :
            this.publisherForm.get('email').hasError('pattern') ? 'Not a valid emailaddress' : '';
    }
}
