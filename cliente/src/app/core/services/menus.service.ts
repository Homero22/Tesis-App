import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import config from "config/config";
import { MenusModel, MenusModelBody, NuevoMenuModel } from "../models/menus";  // Import your menu-related models
import { DataMetadata } from "../models/metadata";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})

export class MenusService {

  private urlApi_menus: string = config.URL_API_BASE + "menus";
  private urlApi_desactivar_menu: string = config.URL_API_BASE + "menus/desactivar";
  private urlApi_buscar_menu: string = config.URL_API_BASE + "menus/buscar";
  private urlApi_filtrar_menu: string = config.URL_API_BASE + "menus/filtrar";
  private urlApi_submenus: string = config.URL_API_BASE + "menus/submenus";

  constructor(private http: HttpClient) {}

  menus!: MenusModelBody[];
  metaData!: DataMetadata;
  menuSeleccionado!: MenusModelBody;
  agregarMenuPadre!: MenusModelBody[];
  nombreMenuPadre!: string;
  idMenuPadre!: number;
  icons: string[] = [
    '3d_rotation', 'ac_unit','access_alarm','access_time','accessibility','accessible','account_balance',
    'account_balance_wallet','account_box','account_circle','account_circle','adb', 'assignment',
    'home','subdirectory_arrow_right','add_location','settings','assignment_turned_in','person'
  ]



  private menuSeleccionado$ = new BehaviorSubject<MenusModelBody>(
  {
    int_menu_id: 0,
    int_menu_padre_id: 0,
    str_menu_nombre: "",
    str_menu_descripcion: "",
    str_menu_path: "",
    str_menu_icono: "",
    str_menu_estado: "",
    dt_fecha_actualizacion: "",
    dt_fecha_creacion: "",
  });
  private dataMetadata$ = new Subject<DataMetadata>();
  private destroy$ = new Subject<any>();
  private dataMenus$ = new Subject<MenusModelBody[]>();
  private updateMenu$ = new BehaviorSubject<MenusModelBody>({
    // Update this based on your menu model
    int_menu_id: 0,
    int_menu_padre_id: 0,
    str_menu_nombre: "",
    str_menu_descripcion: "",
    str_menu_path: "",
    str_menu_icono: "",
    str_menu_estado: "",
    dt_fecha_actualizacion: "",
    dt_fecha_creacion: "",
  });
  private agregarMenuPadre$ = new Subject<MenusModelBody[]>();
  private nombreMenuPadre$ = new Subject<string>();

  setAgregarMenuPadre(menu: MenusModelBody[]) {
    this.agregarMenuPadre$.next(menu);
  }
  get selectAgregarMenuPadre$() {
    return this.agregarMenuPadre$.asObservable();
  }
  setNombreMenuPadre(nombre: string) {
    this.nombreMenuPadre$.next(nombre);
  }
  get selectNombreMenuPadre$() {
    return this.nombreMenuPadre$.asObservable();
  }

  setMenuSeleccionado(menuSeleccionado: MenusModelBody) {
    this.menuSeleccionado$.next(menuSeleccionado);
  }
  get selectMenuSeleccionado$() {
    return this.menuSeleccionado$.asObservable();
  }

  setUpdateMenu(data: MenusModelBody) {
    this.updateMenu$.next(data);
  }

  get selectUpdateMenu$() {
    return this.updateMenu$.asObservable();
  }

  setDataMetadata(data: DataMetadata) {
    this.dataMetadata$.next(data);
  }

  get selectMetadata$() {
    return this.dataMetadata$.asObservable();
  }

  setMenus(data: MenusModelBody[]) {
    this.dataMenus$.next(data);
  }

  get selectMenus$() {
    return this.dataMenus$.asObservable();
  }

  getMenus(params: any) {
    let httpParams = new HttpParams()
      .set("page", params.page)
      .set("limit", params.limit);
    return this.http.get<MenusModel>(this.urlApi_menus, {
      params: httpParams,
      withCredentials: true,
    });
  }
  getSubmenus(_id: number) {
    return this.http.get<MenusModel>(`${this.urlApi_submenus}/${_id}`, {
      withCredentials: true,
    });
  }


  editarMenu(_id: number, _nombre: string, _descripcion: string) {
    return this.http.put<MenusModel>(
      `${this.urlApi_menus}/${_id}`,
      {
        nombre: _nombre,
        descripcion: _descripcion,
      },
      {
        withCredentials: true,
      }
    );
  }

  getMenu(_id: number) {
    return this.http.get<MenusModel>(`${this.urlApi_menus}/${_id}`, {
      withCredentials: true,
    });
  }

  cambiarEstadoMenu(_id: number) {
    return this.http.put<MenusModel>(
      `${this.urlApi_desactivar_menu}/${_id}`,
      {
        withCredentials: true,
      }
    );
  }

  buscarMenu(_texto: string, page: number) {
    let httpParams = new HttpParams()
      .set("texto", _texto)
      .set("page", page);
    return this.http.get<MenusModel>(`${this.urlApi_buscar_menu}`, {
      params: httpParams,
      withCredentials: true,
    });
  }

  filtrarMenus(_filtro: string, page: number) {
    const httpParams = new HttpParams()
      .set("filtro", _filtro)
      .set("page", page);

    return this.http.get<MenusModel>(`${this.urlApi_filtrar_menu}`, {
      params: httpParams,
      withCredentials: true,
    });
  }

  crearMenu(menu: NuevoMenuModel) {
    return this.http.post<MenusModel>(
      `${this.urlApi_menus}`,
      {
        menu,
      },
      {
        withCredentials: true,
      }
    );
  }

  obtenerMenus(params: any) {
    this.getMenus(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: MenusModel) => {
          this.menus = data.body;
          this.agregarMenuPadre = data.body;
          this.metaData = data.metadata;
          this.setDataMetadata(this.metaData);
          this.setMenus(this.menus);
          this.setAgregarMenuPadre(this.menus);
        },
        error: (err) => {
          console.log(err)
          Swal.fire({
            icon:'error',
            title:'Ha ocurrido un error',
            text:err.error.message
          })
        },
      });
  }

  filtrarMenusGeneral(filtro: string, page: number) {
    this.filtrarMenus(filtro, page)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: MenusModel) => {
          this.menus = data.body;
          this.metaData = data.metadata;
          this.setDataMetadata(this.metaData);
          this.setMenus(this.menus);
        },
        error: (err) => {
          Swal.fire({
            icon:'error',
            title:'Ha ocurrido un error',
            text:err.error.message
          })
        },
      });
  }

  buscarMenusGeneral(texto: string, page: number) {
    this.buscarMenu(texto, page)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: MenusModel) => {
          this.menus = data.body;
          this.metaData = data.metadata;
          this.setDataMetadata(this.metaData);
          this.setMenus(this.menus);
        },
        error: (err) => {
          console.log(err.error.message)
          Swal.fire({
            icon:'error',
            title:'Ha ocurrido un error',
            text:err.error.message
          })
        },
      });
  }
  obtenerSubmenus(_id: number) {
    this.getSubmenus(_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: MenusModel) => {
          this.menus = data.body;
          this.metaData = data.metadata;
          this.setDataMetadata(this.metaData);
          this.setMenus(this.menus);
        },
        error: (err) => {
          Swal.fire({
            icon:'error',
            title:'Ha ocurrido un error',
            text:err.error.message
          })
        },
      });
  }

  async obtenerMenuPadre(_id: number) {
    this.getMenu(_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.nombreMenuPadre = data.body.str_menu_nombre;
          this.idMenuPadre = _id;
          console.log("1",data.body.str_menu_nombre)
          this.setNombreMenuPadre(this.nombreMenuPadre);
        },
        error: (err) => {
          Swal.fire({
            icon:'error',
            title:'Ha ocurrido un error',
            text:err.error.message
          })
        },
      });
  }
}
