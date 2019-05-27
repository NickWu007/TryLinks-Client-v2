import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SessionStorage, SessionStorageService } from 'ngx-store';

@Injectable({
  providedIn: 'root'
})
export class TrylinksService {
  static headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  static serverURL = environment.serviceUrl;
  static serverAddr = TrylinksService.serverURL + ':5000';
  @SessionStorage() username = 'unknown user';
  @SessionStorage() lastTutorialId: number = null;
  // static signupUrl = TrylinksService.serverAddr + '/api/user/signup';
  // static loginUrl = TrylinksService.serverAddr + '/api/user/login';
  // static updateUserUrl = serverAddr + '/api/user/update';
  // static interactiveUrl = serverAddr + '/api/initInteractive';
  // static compileUrl = serverAddr + '/api/compile';
  // static fileReadUrl = serverAddr + '/api/file/read';
  // static fileWriteUrl = serverAddr + '/api/file/write';
  // static logoutUrl = serverAddr + '/api/logout';

  // static tutorialUrl = serverAddr + '/api/tutorial/description';
  // static newTutorialUrl = serverAddr + '/api/tutorial/create';
  // static tutorialHeadersUrl = serverAddr + '/api/tutorial/headers';
  // static defaultTutorialIdUrl = serverAddr + '/api/tutorial/defaultId';

  constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) {}

  signup(username: string, email: string, password: string) {
    return this.http
      .post(
        TrylinksService.serverAddr + '/api/user/signup',
        {
          username,
          email,
          password
        },
        {
          headers: TrylinksService.headers,
          withCredentials: true
        }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          return response.status === 200;
        }),
        catchError(error => {
          console.log(`Signup API failed with the following detail:\n`);
          console.log(error);
          return of(false);
        })
      );
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post(
        TrylinksService.serverAddr + '/api/user/login',
        {
          username,
          password
        },
        {
          headers: TrylinksService.headers,
          observe: 'response',
          withCredentials: true
        }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.username = username;
            this.lastTutorialId = response.body.data.last_tutorial;
          }
          return response.status === 200;
        }),
        catchError(error => {
          console.log(`Login API failed with the following detail:\n`);
          console.log(error);
          return of(false);
        })
      );
  }

  logout(): Observable<boolean> {
    return this.http
      .get(
        TrylinksService.serverAddr + '/api/logout',
        {
          headers: TrylinksService.headers,
          observe: 'response',
          withCredentials: true
        }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            this.sessionStorageService.clear('all'); // removes all session storage data
          }
          return response.status === 200;
        }),
        catchError(error => {
          console.log(`Login API failed with the following detail:\n`);
          console.log(error);
          return of(false);
        })
      );
  }

  startInteractiveMode(): Observable<string> {
    return this.http
      .get(
        TrylinksService.serverAddr + '/api/initInteractive',
        {
          headers: TrylinksService.headers,
          observe: 'response',
          withCredentials: true
        }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 200) {
            return response.body.path;
          }
          return '';
        }),
        catchError(error => {
          console.log(`InteractiveUrl API failed with the following detail:\n`);
          console.log(error);
          return of('');
        })
      );
  }

  // Future<String> compileAndDeploy() async {
  //   try {
  //     final response = await _http.get(_compileUrl, headers: _headers);
  //     final socketPath = JSON.decode(response.body)['path'];
  //     return socketPath;
  //   } catch (e) {
  //     print("InteractiveUrl API failed with the following detail:\n");
  //     print(e.toString());
  //     return null;
  //   }
  // }

  // Future<String> getTutorialSource(int id) async {
  //   try {
  //     final response = await _http.post(_fileReadUrl,
  //         headers: _headers, body: JSON.encode({'tutorial': id}));
  //     if (response.statusCode == 200) {
  //       var result = JSON.decode(response.body);
  //       return result["fileData"];
  //     } else {
  //       return null;
  //     }
  //   } catch (e) {
  //     print("File Read API failed");
  //     print(e.toString());
  //     return null;
  //   }
  // }

  // Future<bool> saveTutorialSource(int id, String source) async {
  //   try {
  //     final response = await _http.post(_fileWriteUrl,
  //         headers: _headers,
  //         body: JSON.encode({
  //           'tutorial': id,
  //           'fileData': source,
  //         }));
  //     return response.statusCode == 200;
  //   } catch (e) {
  //     print("File Read API failed");
  //     print(e.toString());
  //     return false;
  //   }
  // }

  // Future<String> getTutorialDesc(int id) async {
  //   try {
  //     final response = await _http.post(_tutorialUrl,
  //         headers: _headers, body: JSON.encode({'tutorialId': id}));
  //     if (response.statusCode == 200) {
  //       var result = JSON.decode(response.body);
  //       return result["description"];
  //     } else {
  //       return null;
  //     }
  //   } catch (e) {
  //     print("Tutorial Read API failed");
  //     print(e.toString());
  //     return null;
  //   }
  // }

  // Future<bool> createTutorial(String title, String desc, String source) async {
  //   try {
  //     final response = await _http.post(_newTutorialUrl,
  //         headers: _headers,
  //         body: JSON.encode({
  //           'title': title,
  //           'description': desc,
  //           'source': source
  //         }));
  //     if (response.statusCode == 200) {
  //       return true;
  //     } else {
  //       print((JSON.decode(response.body))["message"]);
  //       return null;
  //     }

  //   } catch (e) {
  //     print("Tutorial Create API failed");
  //     print(e.toString());
  //     return null;
  //   }
  // }

  // Future<List> getTutorialHeaders() async {
  //   try {
  //     final response = await _http.get(_tutorialHeadersUrl, headers: _headers);
  //     if (response.statusCode != 200) return null;
  //     var result = JSON.decode(response.body);
  //     return result["headers"];
  //   } catch (e) {
  //     print("Retrieval of tutorials' titles failed");
  //     print(e.toString());
  //     return null;
  //   }
  // }

  // Future<int> getDefaultTutorialId() async {
  //   try {
  //     final response = await _http.get(_defaultTutorialIdUrl, headers: _headers);
  //     if (response.statusCode != 200) return null;
  //     var result = JSON.decode(response.body);
  //     return result["tutorialId"];
  //   } catch (e) {
  //     print("Could not retrieve a default tutorial's ID");
  //     print(e.toString());
  //     return null;
  //   }
}
