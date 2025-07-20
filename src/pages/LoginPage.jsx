import Button from '../components/common/Button';
import Input from '../components/common/Input';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-neutral-light">
      <div className="p-8 bg-white rounded-lg shadow-xl w-96">
        <h1 className="text-3xl font-bold font-sans text-primary mb-6 text-center">
          Acceso a la Plataforma
        </h1>
        <form>
          <Input label="Email" id="email" placeholder="su@email.com" />
          <Input label="Contraseña" id="password" type="password" />
          <div className="mt-6">
            <Button variant="primary" type="submit" className="w-full">
              Ingresar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;