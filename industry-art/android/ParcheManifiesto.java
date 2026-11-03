import com.android.aapt.Resources.*;
import java.nio.file.*;

// Uso: java ParcheManifiesto <entrada.xml> <salida.xml> <versionCode> <versionName>   (sin salida: solo muestra)
public class ParcheManifiesto {
  public static void main(java.lang.String[] a) throws Exception {
    XmlNode n = XmlNode.parseFrom(Files.readAllBytes(Paths.get(a[0])));
    XmlElement.Builder e = n.getElement().toBuilder();
    if (!e.getName().equals("manifest")) throw new RuntimeException("raíz inesperada: " + e.getName());
    int cambios = 0;
    for (int i = 0; i < e.getAttributeCount(); i++) {
      XmlAttribute at = e.getAttribute(i);
      if (a.length < 4) { System.out.println(at.getName() + " id=0x" + Integer.toHexString(at.getResourceId()) + " value=" + at.getValue() + " item=" + at.getCompiledItem().toString().replace("\n", " ")); continue; }
      if (at.getResourceId() == 0x0101021b) {
        int code = Integer.parseInt(a[2]);
        e.setAttribute(i, at.toBuilder().setValue(a[2]).setCompiledItem(at.getCompiledItem().toBuilder().setPrim(at.getCompiledItem().getPrim().toBuilder().setIntDecimalValue(code))));
        cambios++;
      } else if (at.getResourceId() == 0x0101021c) {
        XmlAttribute.Builder b = at.toBuilder().setValue(a[3]);
        if (at.hasCompiledItem() && at.getCompiledItem().hasStr()) b.setCompiledItem(at.getCompiledItem().toBuilder().setStr(at.getCompiledItem().getStr().toBuilder().setValue(a[3])));
        e.setAttribute(i, b);
        cambios++;
      }
    }
    if (a.length >= 4) {
      if (cambios != 2) throw new RuntimeException("se esperaban 2 cambios, hubo " + cambios);
      Files.write(Paths.get(a[1]), n.toBuilder().setElement(e).build().toByteArray());
      System.out.println("ok");
    }
  }
}
