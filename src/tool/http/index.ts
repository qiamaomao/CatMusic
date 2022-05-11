export default new class http {
  private http
  constructor({ BASEURL }: { BASEURL: string }) {

    this.http = async (url: string, init: RequestInit) => await fetch(BASEURL + url, init)

  }

  public request<T>(url: string, init: RequestInit): Promise<T> {

    return new Promise(async (resolve, reject) => {

      try {
        resolve((await this.http(url, init)).json())
      } catch (err) {
        reject(err)
      }

    })
  }
}({
  BASEURL: "http://localhost:3000/api"
})