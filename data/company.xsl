<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html lang="ru">
      <head>
        <meta charset="UTF-8"/>
        <title>XML-данные предприятия</title>
        <link rel="stylesheet" href="company.css"/>
      </head>
      <body>
        <h1>Данные предприятия «<xsl:value-of select="company/name"/>»</h1>
        <p>Город: <xsl:value-of select="company/city"/></p>
        <p>Год основания: <xsl:value-of select="company/founded"/></p>
        <p>Количество сотрудников: <xsl:value-of select="company/employees"/></p>
        <table>
          <caption>Основная продукция</caption>
          <tr>
            <th>Название</th>
            <th>Категория</th>
            <th>Цена</th>
          </tr>
          <xsl:for-each select="company/products/product">
            <xsl:sort select="titul" order="ascending"/>
            <tr>
              <td><xsl:value-of select="titul"/></td>
              <td><xsl:value-of select="category"/></td>
              <td><xsl:value-of select="price"/> BYN</td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
