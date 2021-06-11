<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns="http://www.w3.org/1999/xhtml"
xmlns:x="http://panax.io/xdom"
xmlns:state="http://panax.io/state"
xmlns:custom="http://panax.io/custom"
exclude-result-prefixes="#default"
>
  <xsl:key name="fecha" match="*" use="substring(@fecha,1,10)"/>
  <xsl:template match="reporte">
    <main>
      <table class="table table-bordered table-striped">
        <xsl:apply-templates select="preguntas"/>
        <xsl:apply-templates select="respuestas"/>
        <tfoot></tfoot>
      </table>
    </main>
  </xsl:template>

  <xsl:template match="preguntas">
    <thead>
      <tr>
        <th>Hora</th>
        <th>Correo</th>
        <xsl:apply-templates/>
      </tr>
    </thead>
  </xsl:template>

  <xsl:template match="respuestas">
    <tbody>
      <xsl:apply-templates/>
    </tbody>
  </xsl:template>

  <xsl:template match="respuestas/*">
    <xsl:variable name="fecha" select="substring(@fecha,1,10)"/>
    <xsl:if test="count(key('fecha',$fecha)[1]|.)=1">
      <tr>
        <th colspan="{2+count(*)}" class="text-center">
          <xsl:value-of select="$fecha"/>
        </th>
      </tr>
    </xsl:if>
    <tr>
      <td>
        <xsl:apply-templates select="@fecha"/>
      </td>
      <td>
        <xsl:apply-templates select="@email"/>
      </td>
      <xsl:apply-templates/>
    </tr>
  </xsl:template>

  <xsl:template match="@fecha">
    <xsl:value-of select="substring(substring-after(.,'T'),1,5)"/>
  </xsl:template>

  <xsl:template match="respuestas/respuesta/*/text()">
  </xsl:template>

  <xsl:template match="respuestas/respuesta/*/text()[.=0]">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x text-success" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  </xsl:template>

  <xsl:template match="respuestas/respuesta/*/text()[.=1]">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-danger" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
  </xsl:template>

  <xsl:template match="respuestas/respuesta/*">
    <td class="text-center">
      <xsl:apply-templates/>
    </td>
  </xsl:template>

  <xsl:template match="preguntas/*">
    <th class="text-center">
      <xsl:value-of select="@x:value"/>
    </th>
  </xsl:template>

</xsl:stylesheet>
