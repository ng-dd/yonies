import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class HashService {

  constructor(private http: Http) { }

  getHash(hash) {
    this.http.get(`http://localhost:4201/hashes/${hash.hash}`)
    .subscribe((data) => {
      console.log(data.json())
    }, (err) => {
      console.log(err)
    })
  }

  addHash(hash) {
    console.log(hash.label, 'service')
    this.http.post('http://localhost:4201/hashes', {
      postId: hash.postId,
      label: hash.label,
    })
  }

  deleteHash(hash) {
    this.http.delete(`/hashes/${hash.postId}`)
  }
}
