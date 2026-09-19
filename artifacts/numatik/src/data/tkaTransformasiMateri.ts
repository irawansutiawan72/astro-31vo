import type { MateriSection } from "@/components/tka/TKAPemantapanLayout";

export const tkaTransformasiMateri: MateriSection[] = [
  {
    heading: "A. Definisi Transformasi",
    content: `Transformasi geometri adalah proses pemetaan satu atau beberapa titik pada bidang ke titik lain. Titik hasil pemetaan disebut bayangan.

Jenis transformasi:
1. Translasi (pergeseran)
2. Refleksi (pencerminan)
3. Rotasi (perputaran)
4. Dilatasi (perubahan skala)`,
  },
  {
    heading: "B. Translasi (Pergeseran)",
    content: `Translasi memindahkan setiap titik dengan jarak dan arah tertentu.

Jika titik $A(x,y)$ ditranslasi oleh $T(a,b)$, bayangannya adalah:

$$A(x,y) \\xrightarrow{T(a,b)} A'(x+a,y+b)$$`,
  },
  {
    heading: "C. Refleksi (Pencerminan)",
    content: `Refleksi memindahkan titik berdasarkan sifat bayangan cermin.

$$M_{sumbu-x}: (x,y) \\to (x,-y)$$
$$M_{sumbu-y}: (x,y) \\to (-x,y)$$
$$M_{y=x}: (x,y) \\to (y,x)$$
$$M_{y=-x}: (x,y) \\to (-y,-x)$$
$$M_{(0,0)}: (x,y) \\to (-x,-y)$$
$$M_{x=h}: (x,y) \\to (2h-x,y)$$
$$M_{y=k}: (x,y) \\to (x,2k-y)$$`,
  },
  {
    heading: "D. Rotasi (Perputaran)",
    content: `Rotasi ditentukan oleh pusat, arah, dan besar sudut. Untuk pusat $O(0,0)$:

$$R_{90^\\circ}: (x,y) \\to (-y,x)$$
$$R_{180^\\circ}: (x,y) \\to (-x,-y)$$
$$R_{270^\\circ}: (x,y) \\to (y,-x)$$

Rotasi berlawanan arah jarum jam bernilai positif, sedangkan rotasi searah jarum jam bernilai negatif.`,
  },
  {
    heading: "E. Dilatasi (Perubahan Skala)",
    content: `Dilatasi mengubah ukuran bangun tanpa mengubah bentuknya.

Dengan pusat $O(0,0)$ dan faktor skala $k$:

$$D_{[O,k]}: (x,y) \\to (kx,ky)$$

Dengan pusat $(a,b)$ dan faktor skala $k$:

$$D_{[(a,b),k]}: (x,y) \\to (k(x-a)+a,k(y-b)+b)$$`,
  },
];