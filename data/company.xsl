<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <div class="cards-3" id="catalog-list">
      <xsl:for-each select="products/item">
        <article class="card product-card product {@category} active-card">
          <div class="product-icon"><xsl:value-of select="icon"/></div>
          <h3><xsl:value-of select="name"/></h3>
          <p><xsl:value-of select="description"/></p>
          <strong><xsl:value-of select="price"/></strong>
        </article>
      </xsl:for-each>
    </div>
  </xsl:template>
</xsl:stylesheet>
