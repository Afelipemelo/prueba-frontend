import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, Observable, pipe, tap, throwError } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse, Data, OneProductsResponse } from '../interface/product.interface';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrlProducts;

@Injectable({ providedIn: "root" })
export class ProductsService {

  private http = inject(HttpClient);


  private handleError(error: HttpErrorResponse): Observable<never> {
    let userMessage = 'Ha ocurrido un error inesperado.';

    if (error.error && error.error.errors && Array.isArray(error.error.errors)) {
      const apiError = error.error.errors[0];
      userMessage = `${apiError.title || 'Error de API'}: ${apiError.detail || 'Sin detalles adicionales.'}`;

      console.error(`Error ${error.status} (API): ${userMessage}`, error.error);
    } else if (error.status === 0) {
      userMessage = 'No se pudo conectar con el servidor de productos. Verifique su conexión.';
      console.error('Error de Conexión:', error.message);
    } else {
      userMessage = `Error del servidor (${error.status}): ${error.statusText}`;
      console.error('Error HTTP Genérico:', error);
    }
    return throwError(() => new Error(userMessage));
  }


  getProducts(page: number, size: number): Observable<ProductsResponse> {


    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: { page, size }
      })
      .pipe(
        tap((resp) => console.log('Lista de Productos:', resp.data)),
        catchError(this.handleError)
      );
  }

  getProductById(id: number): Observable<OneProductsResponse> {

    if (!id || id <= 0) {
      return throwError(() => new Error('ID de producto inválido. No se puede buscar.'));
    }

    return this.http
      .get<OneProductsResponse>(`${baseUrl}/products/${id}`)
      .pipe(
        delay(500),
        tap((resp) => console.log(`Producto ${id} encontrado:`, resp.data)),
        catchError(this.handleError)
      );
  }

  createProduct(attributes: Product): Observable<ProductsResponse> {
    if (!attributes.productName || attributes.productPrice === undefined || attributes.productCategory === undefined) {
      return throwError(() => new Error('Nombre, Precio y Categoría son obligatorios para crear un producto.'));
    }

    const requestBody: Data = {
      type: 'products',
      attributes: attributes
    };

    return this.http
      .post<ProductsResponse>(`${baseUrl}/products`, requestBody)
      .pipe(
        tap((resp) => console.log("Producto creado con éxito:", resp)),
        catchError(this.handleError)
      );
  }

  updateProduct(id: number, attributes: Product): Observable<ProductsResponse> {
    if (!id || id <= 0) {
      return throwError(() => new Error('ID de producto inválido. No se puede actualizar.'));
    }
    console.log(attributes)
    console.log(!attributes.productName)
    console.log(attributes.productPrice === undefined)
    if (!attributes.productName || attributes.productPrice === undefined) {
      return throwError(() => new Error('Nombre y Precio son obligatorios para la actualización.'));
    }
    const data: Data = {
      id: id,
      type: 'products',
      attributes: attributes

    };
    const requestBody = {
      data: data
    }
    console.log(requestBody)

    return this.http
      .put<ProductsResponse>(`${baseUrl}/products/${id}`, requestBody)
      .pipe(
        tap((resp) => console.log("Producto actualizado con éxito:", resp)),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<Object> {
    if (!id || id <= 0) {
      return throwError(() => new Error('ID de producto inválido. No se puede eliminar.'));
    }
    return this.http.delete<Object>(`${baseUrl}/products/${id}`)
      .pipe(
        tap(() => console.log(`Producto con ID ${id} eliminado con éxito.`)),
        catchError(this.handleError)
      );
  }


}
