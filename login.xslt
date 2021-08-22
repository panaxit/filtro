<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns="http://www.w3.org/1999/xhtml"
xmlns:x="http://panax.io/xdom"
xmlns:state="http://panax.io/state"
xmlns:custom="http://panax.io/custom"
exclude-result-prefixes="#default"
>
  <xsl:template match="*">
    <div class="text-center">
      <style>
        <![CDATA[
        html,
        body {
          height: 100%;
        }

        body > div {
          display: flex;
          align-items: center;
          padding-top: 40px;
          padding-bottom: 40px;
          background-color: #f5f5f5;
        }

        .form-signin {
          width: 100%;
          max-width: 330px;
          padding: 15px;
          margin: auto;
        }

        .form-signin .checkbox {
          font-weight: 400;
        }

        .form-signin .form-floating:focus-within {
          z-index: 2;
        }

        .form-signin input[type="email"] {
          margin-bottom: -1px;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }

        .form-signin input[type="password"] {
          margin-bottom: 10px;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }

        .bd-placeholder-img {
          font-size: 1.125rem;
          text-anchor: middle;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        @media (min-width: 768px) {
          .bd-placeholder-img-lg {
            font-size: 3.5rem;
          }
        }]]>
      </style>
      <main class="form-signin">
        <form>
          <img class="mb-4" src="assets/panax.png" alt="" width="72"/>
          <h1 class="h3 mb-3 fw-normal">Filtro de Acceso</h1>

          <div class="form-floating">
            <input type="text" class="form-control" id="floatingEmail" placeholder="name@example.com" width=""/>
            <label for="floatingEmail">Correo autorizado</label>
          </div>
          <br/>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Password</label>
          </div>

          <!--<div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"/> Remember me
            </label>
          </div>-->
          <button class="w-100 btn btn-lg btn-primary" type="submit" xo-target="{@x:id}" onclick="xdom.session.login(floatingEmail.value, calcMD5(floatingPassword.value), location.hash.split('#').pop())">Continuar</button>
          <p class="mt-5 mb-3 text-muted">&#169; 2021</p>
        </form>
      </main>
    </div>
  </xsl:template>
</xsl:stylesheet>
